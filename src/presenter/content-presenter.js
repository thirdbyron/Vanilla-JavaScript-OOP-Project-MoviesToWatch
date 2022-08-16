import { render } from '../framework/render.js';
import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListPresenter from './movies-list-presenter.js';

export default class ContentPresenter {

  #mainContainer = null;
  #movies = null;
  #contentComponent = null;
  #moviesListWrapperComponent = null;
  #onUpdateFilters = null;

  init(mainContainer, movies, onUpdateFilters) {

    this.#mainContainer = mainContainer;
    this.#movies = [...movies];
    this.#onUpdateFilters = onUpdateFilters;

    this.#renderContent();
  }

  #presentMoviesList() {
    if (this.#movies.length === 0) {
      this.#moviesListWrapperComponent.showEmptyListTitle();
    } else {
      new MoviesListPresenter().init(
        this.#moviesListWrapperComponent.element,
        this.#movies,
        this.#mainContainer.parentNode,
        this.#onUpdateFilters,
      );
    }
  }

  #renderContent() {
    this.#contentComponent = new ContentView;
    this.#moviesListWrapperComponent = new MoviesListWrapperView;

    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);

    this.#presentMoviesList();
  }

}
