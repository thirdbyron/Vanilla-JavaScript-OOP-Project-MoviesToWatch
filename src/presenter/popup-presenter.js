import { render } from '../framework/render.js';

import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';

import MovieDescriptionPresenter from './movie-description-presenter.js';

// Временное решение:

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    window.removeEventListener('keydown', onEscKeyDown);
    document.querySelector('.film-details').remove();
    document.querySelector('body').classList.remove('hide-overflow');
  }
};

export default class PopupPresenter {

  #mainContainer = null;

  #movie = null;
  #comments = null;

  #wrapperComponent = null;
  #contentComponent = null;

  init(mainContainer, movie, comments) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#comments = comments;

    this.#renderPopup();
  }

  #renderPopup() {
    this.#wrapperComponent = new PopupWrapperView;
    this.#contentComponent = new PopupContentView;

    render(this.#wrapperComponent, this.#mainContainer);
    render(this.#contentComponent, this.#wrapperComponent.element);

    window.addEventListener('keydown', onEscKeyDown);

    new MovieDescriptionPresenter().init(this.#contentComponent.element, this.#movie, this.#comments, this.#handlePopupCloseClick);
  }

  #handlePopupCloseClick = () => {
    window.removeEventListener('keydown', onEscKeyDown);
    this.#mainContainer.querySelector('.film-details').remove();
    this.#mainContainer.classList.remove('hide-overflow');
  };

}
