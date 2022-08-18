import { render } from '../framework/render.js';
import SortingBarView from '../view/sorting-bar-view.js';
import { SORT_TYPE } from '../const.js';
import { sortMovieByDate, sortMovieByRating } from '../utils/movie-data.js';

export default class SortingBarPresenter {

  #mainContainer = null;
  #movies = null;
  #onResetSortedMovies = null;
  #sortingBarComponent = null;
  #onClearMovies = null;
  #onRenderMovies = null;
  #currentSortType = SORT_TYPE.default;

  init(mainContainer, movies, onResetSortedMovies, onClearMovies, onRenderMovies) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#onResetSortedMovies = onResetSortedMovies;
    this.#onClearMovies = onClearMovies;
    this.#onRenderMovies = onRenderMovies;
    this.#sortingBarComponent = new SortingBarView;

    this.#renderSortBar();
  }

  #renderSortBar() {
    render(this.#sortingBarComponent, this.#mainContainer);

    this.#sortingBarComponent.setSortTypeChangeHandler(this.#handleMoviesChange);
  }

  #sortMovies = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.date:
        this.#movies.sort(sortMovieByDate);
        break;
      case SORT_TYPE.rating:
        this.#movies.sort(sortMovieByRating);
        break;
      case SORT_TYPE.default:
        this.#onResetSortedMovies();
    }

    this.#currentSortType = sortType;
  };

  getActualMovies(actualMovies) {
    this.#movies = actualMovies;
  }

  #handleMoviesChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#sortMovies(sortType);
      this.#onClearMovies();
      this.#onRenderMovies();
    }
  };

}
