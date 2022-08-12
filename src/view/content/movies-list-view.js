import { createElement } from '../../render.js';

const createMoviesListTemplate = () => '<div class="films-list__container"> </div>';

export default class MoviesListView {
  #element = null;

  get template() {
    return createMoviesListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}
