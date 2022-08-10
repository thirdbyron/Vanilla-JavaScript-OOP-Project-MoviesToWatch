import { createElement } from '../../render.js';

const createContentTemplate = () => '<section class="films"> </section>';

export default class SortingBarView {
  getTemplate() {
    return createContentTemplate();
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
