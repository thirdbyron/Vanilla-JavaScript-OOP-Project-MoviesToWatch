import { remove, render } from '../framework/render.js';
import { MOVIE_ONLY_FOR_POPUP_ID } from '../const.js';
import MoviesListView from '../view/content/movies-list-view.js';
import MovieCardPresenter from './movie-card-presenter';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';

export default class MoviesListPresenter {

  #mainContainer = null;
  #movies = null;
  #bodyNode = null;
  #onChangeData = null;
  #currentFilter = null;
  #commentsModel = null;
  #quantityOfRenderedMovies = null;
  #moviesListComponent = null;
  #movieCardPresenters = new Map();
  #showMoreButtonPresenter = new ShowMoreButtonPresenter;


  init(mainContainer, movies, bodyNode, onChangeData, currentFilter, commentsModel, quantityOfRenderedMovies) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#bodyNode = bodyNode;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#commentsModel = commentsModel;
    this.#quantityOfRenderedMovies = quantityOfRenderedMovies;

    this.#moviesListComponent = new MoviesListView;

    this.renderMoviesList();
  }

  renderMoviesList() {
    render(this.#moviesListComponent, this.#mainContainer);

    for (let i = 0; i < Math.min(this.#movies.length, this.#quantityOfRenderedMovies); i++) {
      this.presentMovieCard(this.#movies[i]);
    }
    this.#presentShowMoreButton();
  }

  clearMoviesList() {
    remove(this.#moviesListComponent);
    if (this.#movieCardPresenters.has(MOVIE_ONLY_FOR_POPUP_ID)) {
      this.#movieCardPresenters.forEach((presenter) => {
        if (!presenter.isPopupOnly) {
          presenter.destroy();
          this.#movieCardPresenters.delete(presenter.movie.id);
        }
      });
    } else {
      this.#movieCardPresenters.forEach((presenter) => presenter.destroy());
      this.#movieCardPresenters.clear();
    }
    this.#showMoreButtonPresenter.destroy();
  }

  presentMovieCard = (movie, isPopupOnly = false, scrollPosition = 0) => {
    const moviePresenter = new MovieCardPresenter;

    moviePresenter.init(
      this.#moviesListComponent,
      movie,
      isPopupOnly,
      scrollPosition,
      this.#commentsModel,
      this.#bodyNode,
      this.#removePreviousPopup,
      this.#onChangeData,
      this.#currentFilter,
    );

    if (isPopupOnly) {
      this.#movieCardPresenters.set(MOVIE_ONLY_FOR_POPUP_ID, moviePresenter);
    } else {
      this.#movieCardPresenters.set(movie.id, moviePresenter);
    }
  };

  getMovieCardPresenters = () => this.#movieCardPresenters;

  #presentShowMoreButton() {
    if (this.#movies.length > this.#quantityOfRenderedMovies) {

      this.#showMoreButtonPresenter.init(
        this.#mainContainer,
        this.#movies,
        this.presentMovieCard,
        this.#quantityOfRenderedMovies
      );
    }
  }

  getShowMoreButtonPresenter = () => this.#showMoreButtonPresenter;

  #removePreviousPopup = () => {
    const previousPopup = Array.from(this.#movieCardPresenters.values()).find((presenter) => presenter.isPopupOpen);
    if (previousPopup) {
      const movieForPopupPresenter = this.#movieCardPresenters.get(MOVIE_ONLY_FOR_POPUP_ID);
      if (movieForPopupPresenter) {
        this.#movieCardPresenters.delete(MOVIE_ONLY_FOR_POPUP_ID);
      }
      previousPopup.clearPreviousPopup();
    }
  };

}
