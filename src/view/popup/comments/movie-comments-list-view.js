import { createElement } from '../../../render.js';

const createMovieCommentsListTemplate = () => '<ul class="film-details__comments-list"> </ul>';

export default class MovieCommentsListView {
  #element = null;

  get template() {
    return createMovieCommentsListTemplate();
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

