import { remove, render } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION, SORT_TYPE, FILTER_TYPE } from '../const.js';
import { sortMovieByDate, sortMovieByRating } from '../utils/movie-data.js';
import { moviesPerFilter } from '../utils/filters.js';
import ContentView from '../view/content/content-view.js';
import CommentsModel from '../model/comments-model.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListPresenter from './movies-list-presenter.js';
import SortingBarPresenter from './sorting-bar-presenter.js';

export default class ContentPresenter {

  #mainContainer = null;
  #moviesModel = null;
  #filtersModel = null;
  #commentsModel = null;
  #contentComponent = null;
  #moviesListWrapperComponent = null;
  #moviesListPresenter = null;
  #sortingBarPresenter = null;
  #currentSortType = null;

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
    this.#commentsModel = new CommentsModel;
    this.#currentSortType = SORT_TYPE.default;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#moviesModel.setComments(this.#commentsModel.comments);

    this.#filtersModel.addObserver(this.#handleModelEvent);

    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);

    this.#checkForMovies();

  }

  #renderContentTemplate() {
    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);
  }

  #renderContent() {
    this.#renderContentTemplate();

    this.#moviesListPresenter = new MoviesListPresenter;
    this.#moviesListPresenter.init(
      this.#moviesListWrapperComponent.element,
      this.movies,
      this.#mainContainer.parentNode,
      this.#handleViewAction,
      this.#filtersModel.filter,
      this.#commentsModel,
      this.#moviesModel
    );
  }

  #checkForMovies() {
    this.#contentComponent = new ContentView;
    this.#moviesListWrapperComponent = new MoviesListWrapperView(this.#filtersModel.filter);

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

  #clearContent(needSortTypeReset = false) {
    if (needSortTypeReset) {
      this.#currentSortType = SORT_TYPE.default;
    }

    this.#sortingBarPresenter.destroy();

    if (this.#moviesListPresenter) {
      this.#moviesListPresenter.clearMoviesList();
    }
    remove(this.#contentComponent);
  }

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

  #handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UPDATE_TYPE.patch:
        this.#moviesListPresenter.getMovieCardPresenters().get(update.id).rerenderMovieCard(update);
        break;
      case UPDATE_TYPE.minor:
        if (update !== null && Object.values(SORT_TYPE).some((value) => update === value)) {
          this.#currentSortType = update;
        }
        this.#clearContent();
        this.#checkForMovies();
        break;
      case UPDATE_TYPE.major:
        this.#clearContent(true);
        this.#checkForMovies();
        break;
    }
  };

  #handleCommentsModelEvent = (movie) => {
    this.#moviesListPresenter.getMovieCardPresenters().get(movie.id).getPopupPresenter().getMovieDescriptionPresenter().rerenderComments();
  };

}
