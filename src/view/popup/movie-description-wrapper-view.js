import { createElement } from '../../render.js';

const createMoviesDescriptionWrapperTemplate = () => `<div class="film-details__top-container">
<div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
</div> </div>`;

export default class MoviesDescriptionWrapperView {
  #element = null;

  get template() {
    return createMoviesDescriptionWrapperTemplate();
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

