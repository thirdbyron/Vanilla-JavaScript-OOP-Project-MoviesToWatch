import { render } from '../framework/render.js';
import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListPresenter from './movies-list-presenter.js';
import SortingBarPresenter from './sorting-bar-presenter.js';

export default class ContentPresenter {

  #mainContainer = null;
  #movies = null;
  #contentComponent = null;
  #moviesListWrapperComponent = null;
  #filterPresenter = null;
  #moviesListPresenter = null;
  #sortingBarPresenter = null;

  init(mainContainer, movies, filterPresenter) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#filterPresenter = filterPresenter;

    this.#checkForMovies();

  }

  #renderContent() {

    this.#sortingBarPresenter = new SortingBarPresenter;
    this.#moviesListPresenter = new MoviesListPresenter;
    this.#contentComponent = new ContentView;
    this.#moviesListWrapperComponent = new MoviesListWrapperView;

    this.#sortingBarPresenter.init(
      this.#mainContainer,
      this.#movies,
      this.#handleGetActualMovies,
      this.#handleClearMovies,
      this.#handleRenderMovies
    );

    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);

    this.#moviesListPresenter.init(
      this.#moviesListWrapperComponent.element,
      this.#movies,
      this.#mainContainer.parentNode,
      this.#filterPresenter.updateFilters,
      this.#handleGetActualMovies
    );

  }

  #checkForMovies() {
    if (this.#movies.length === 0) {
      this.#moviesListWrapperComponent.showEmptyListTitle();
    } else {
      this.#renderContent();
    }
  }

  #handleGetActualMovies = (movies) => {
    this.#movies = [...movies];
    this.#sortingBarPresenter.getActualMovies(this.#movies);
    this.#filterPresenter.getActualMovies(this.#movies);
    this.#moviesListPresenter.getActualMovies(this.#movies);
  };

  #handleClearMovies = () => {
    this.#moviesListPresenter.clearMoviesList();
  };

  #handleRenderMovies = () => {
    this.#moviesListPresenter.renderMoviesList(this.#movies);
  };

}
