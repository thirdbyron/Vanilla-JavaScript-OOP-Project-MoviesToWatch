import { remove, render } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION, SORT_TYPE, FILTER_TYPE, MOVIE_ONLY_FOR_POPUP_ID, MOVIES_PER_ROW } from '../const.js';
import { sortMovieByDate, sortMovieByRating } from '../utils/movie-data.js';
import { moviesPerFilter } from '../utils/filters.js';
import { END_POINT, AUTHORIZATION } from '../const.js';
import ContentView from '../view/content/content-view.js';
import CommentsModel from '../model/comments-model.js';
import CommentsApiService from '../comments-api-service.js';
import LoadingView from '../view/content/loading-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListPresenter from './movies-list-presenter.js';
import SortingBarPresenter from './sorting-bar-presenter.js';

export default class ContentPresenter {

  #mainContainer = null;
  #moviesModel = null;
  #filtersModel = null;
  #commentsModel = null;
  #contentComponent = null;
  #loadingComponent = null;
  #moviesListWrapperComponent = null;
  #moviesListPresenter = null;
  #sortingBarPresenter = null;
  #currentSortType = null;
  #quantityOfRenderedMovies = MOVIES_PER_ROW;
  #isLoading = true;

  get movies() {

    const filterType = this.#filtersModel.filter;
    const movies = this.#moviesModel.movies;

    const filteredMovies = moviesPerFilter[FILTER_TYPE[filterType]](movies);

    switch (this.#currentSortType) {
      case SORT_TYPE.date:
        return filteredMovies.sort(sortMovieByDate);
      case SORT_TYPE.rating:
        return filteredMovies.sort(sortMovieByRating);
    }
    return filteredMovies;
  }

  init(mainContainer, moviesModel, filtersModel) {

    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#filtersModel = filtersModel;
    this.#commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
    this.#currentSortType = SORT_TYPE.default;

    this.#moviesModel.addObserver(this.#handleModelEvent);

    this.#filtersModel.addObserver(this.#handleModelEvent);

    this.#moviesListPresenter = new MoviesListPresenter;

    if (this.#isLoading) {
      this.#renderContentTemplate();
      this.#loadingComponent = new LoadingView;
      render(this.#loadingComponent, this.#moviesListWrapperComponent.element);
    }

  }

  #renderContentTemplate() {
    this.#contentComponent = new ContentView;
    this.#moviesListWrapperComponent = new MoviesListWrapperView(this.#filtersModel.filter);

    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);

  }

  #renderContent() {
    this.#renderContentTemplate();

    this.#moviesListPresenter.init(
      this.#moviesListWrapperComponent.element,
      this.movies,
      this.#mainContainer.parentNode,
      this.#handleViewAction,
      this.#filtersModel.filter,
      this.#commentsModel,
      this.#quantityOfRenderedMovies
    );
  }

  #checkForMovies() {
    this.#sortingBarPresenter = new SortingBarPresenter;
    this.#sortingBarPresenter.init(
      this.#mainContainer,
      this.#currentSortType,
      this.#handleViewAction
    );

    if (this.movies.length === 0) {
      this.#sortingBarPresenter.destroy();
      this.#renderContentTemplate();
      this.#moviesListWrapperComponent.showEmptyListTitle();
    } else {
      this.#renderContent();
    }
  }

  #clearContent({ needSortTypeReset = false, needRemainRenderedMovie = false } = {}) {

    if (needRemainRenderedMovie) {
      this.#quantityOfRenderedMovies = this.#moviesListPresenter.getShowMoreButtonPresenter().quantityOfRenderedMovies;
    } else {
      this.#quantityOfRenderedMovies = MOVIES_PER_ROW;
    }

    if (needSortTypeReset) {
      this.#currentSortType = SORT_TYPE.default;
    }

    this.#sortingBarPresenter.destroy();

    this.#moviesListPresenter.clearMoviesList();

    remove(this.#contentComponent);
    remove(this.#moviesListWrapperComponent);
  }

  #checkForPopupOpen = () => {
    const movieForPopupPresenter = Array.from(this.#moviesListPresenter.getMovieCardPresenters().values()).find((presenter) => presenter.isPopupOpen);

    if (movieForPopupPresenter) {
      const updatedMovie = this.#moviesModel.movies.find((movie) => movie.id === movieForPopupPresenter.movie.id);

      const isPopupOnly = true;
      const scrollPosition = movieForPopupPresenter.popupScrollPosition;

      movieForPopupPresenter.setMovie(updatedMovie);

      if (this.#moviesListPresenter.getMovieCardPresenters().has(MOVIE_ONLY_FOR_POPUP_ID)) {
        this.#moviesListPresenter.getMovieCardPresenters().get(MOVIE_ONLY_FOR_POPUP_ID).destroy();
        this.#moviesListPresenter.getMovieCardPresenters().delete(MOVIE_ONLY_FOR_POPUP_ID);
      }

      this.#moviesListPresenter.presentMovieCard(movieForPopupPresenter.movie, isPopupOnly, scrollPosition);
    }
  };

  #getMoviePresenter = (movieId) => this.#moviesListPresenter.getMovieCardPresenters().get(movieId);

  #handlePatchUpdate(update) {
    this.#getMoviePresenter(update.id)?.setMovie(update);
    this.#getMoviePresenter(update.id)?.rerenderMovieCard();

    if (this.#getMoviePresenter(MOVIE_ONLY_FOR_POPUP_ID)?.movie.id === update.id) {
      this.#getMoviePresenter(MOVIE_ONLY_FOR_POPUP_ID).setMovie(update);

      this.#getMoviePresenter(MOVIE_ONLY_FOR_POPUP_ID).rerenderPopupControllButtons(update);
    }
  }

  #handleModelEventError(update) {
    if (!update.isPopupChange) {
      this.#getMoviePresenter(update.id).shakeElementWhileError();
    } else {
      this.#getMoviePresenter(update.id)?.getPopupPresenter().getMovieDescriptionPresenter().shakePopupControlButtons();

      this.#getMoviePresenter(MOVIE_ONLY_FOR_POPUP_ID)?.getPopupPresenter().getMovieDescriptionPresenter().shakePopupControlButtons();
    }
  }

  #handleCommentChangeMovieModelError = (update) => {
    update.isCommentsChange = false;
    this.#getMoviePresenter(update.id)?.getPopupPresenter().getMovieDescriptionPresenter().showCommentsChangeMovieModelError();

    this.#getMoviePresenter(MOVIE_ONLY_FOR_POPUP_ID)?.getPopupPresenter().getMovieDescriptionPresenter().showCommentsChangeMovieModelError();
  };

  #handleModelEvent = (updateType, update) => {

    const isforSorting = Object.values(SORT_TYPE).some((value) => update === value);

    switch (updateType) {
      case UPDATE_TYPE.init:
        this.#isLoading = false;
        remove(this.#contentComponent);
        this.#checkForMovies();
        document.querySelector('.footer__statistics').textContent = `${this.movies.length} movies inside`;
        break;
      case UPDATE_TYPE.patch:
        this.#handlePatchUpdate(update);
        break;
      case UPDATE_TYPE.minor:
        if (isforSorting) {
          this.#currentSortType = update;
        }
        this.#checkForPopupOpen();
        this.#clearContent({ needRemainRenderedMovie: !isforSorting });
        this.#checkForMovies();
        break;
      case UPDATE_TYPE.major:
        this.#checkForPopupOpen();
        this.#clearContent({ needSortTypeReset: true });
        this.#checkForMovies();
        break;
      case UPDATE_TYPE.error:
        if (update.isCommentsChange) {
          this.#handleCommentChangeMovieModelError(update);
        } else {
          this.#handleModelEventError(update);
        }
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.updateMovie:
        this.#moviesModel.updateMovie(updateType, update);
        break;
      case USER_ACTION.sortMovies:
        this.#moviesModel.sortMovies(updateType, update);
        break;
    }
  };

}
