import { render } from '../framework/render.js';

import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';


import MoviesListPresenter from './movies-list-presenter.js';


export default class ContentPresenter {

  #mainContainer = null;
  #movies = null;

  #contentComponent = new ContentView;
  #moviesListWrapperComponent = new MoviesListWrapperView;

  init(mainContainer, moviesModel) {

    this.#mainContainer = mainContainer;

    this.#movies = [...moviesModel.movies];

    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);

    if (this.#movies.length === 0) {
      this.#moviesListWrapperComponent.showEmptyListTitle();
    } else {
      new MoviesListPresenter().init(this.#moviesListWrapperComponent, this.#movies, this.#mainContainer.parentNode);
    }
  }

}
