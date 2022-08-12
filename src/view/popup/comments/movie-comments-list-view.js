import { createElement } from '../../../render.js';

const createMovieCommentsListTemplate = () => '<ul class="film-details__comments-list"> </ul>';

export default class MovieCommentsListView {

  getTemplate() {
    return createMovieCommentsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
