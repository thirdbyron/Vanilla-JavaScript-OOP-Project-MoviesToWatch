import { createElement } from '../../render.js';

const createMoviesListTemplate = () => '<div class="films-list__container"> </div>';

export default class MoviesListView {
  getTemplate() {
    return createMoviesListTemplate();
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
