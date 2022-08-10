import { createElement } from '../../render.js';

const createPopupContentTemplate = () => '<div class="film-details__inner"> </div>';

export default class PopupContentView {
  getTemplate() {
    return createPopupContentTemplate();
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
