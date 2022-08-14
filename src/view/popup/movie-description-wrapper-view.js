import AbstractView from '../../framework/view/abstract-view.js';

const createMoviesDescriptionWrapperTemplate = () => `<div class="film-details__top-container">
<div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
</div> </div>`;

export default class MoviesDescriptionWrapperView extends AbstractView {

  get template() {
    return createMoviesDescriptionWrapperTemplate();
  }

  get closeButtonElement() {
    return this.element.querySelector('.film-details__close-btn');
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.closeButtonElement.addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

}

