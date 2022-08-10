import { createElement } from '../../render.js';

const createMoviesListWrapperTemplate = () => `<section class="films-list">
<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2> </section>`;

export default class MoviesListWrapperView {
  getTemplate() {
    return createMoviesListWrapperTemplate();
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
