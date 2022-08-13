import { render } from '../render.js';

import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';
import MovieDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

import PopupCommentsPresenter from './popup-comments-presenter.js';

export default class PopupPresenter {

  #mainContainer = null;

  #movie = null;
  #comments = null;

  #wrapperComponent = null;
  #contentComponent = null;
  #descriptionWrapperComponent = null;
  #controlsComponent = null;

  #commentPresenter = null;

  #removePreviousPopup() {
    if (this.#mainContainer.querySelector('.film-details')) {
      this.#mainContainer.querySelector('.film-details').remove();
    }
  }

  #hideOverflow() {
    if (!(this.#mainContainer.classList.contains('hide-overflow'))) {
      this.#mainContainer.classList.add('hide-overflow');
    }
  }

  init(mainContainer, movie, comments) {

    this.#mainContainer = mainContainer;

    this.#movie = movie;
    this.#comments = comments;

    this.#removePreviousPopup();

    this.#hideOverflow();

    this.#wrapperComponent = new PopupWrapperView;
    this.#contentComponent = new PopupContentView;
    this.#descriptionWrapperComponent = new MovieDescriptionWrapperView;
    this.#controlsComponent = new MovieControlsView;

    this.#commentPresenter = new PopupCommentsPresenter;

    render(this.#wrapperComponent, mainContainer);
    render(this.#contentComponent, this.#wrapperComponent.element);
    render(this.#descriptionWrapperComponent, this.#contentComponent.element);

    this.#descriptionWrapperComponent.closeButtonElement.addEventListener('click', this.#handlePopupCloseClick);

    window.addEventListener('keydown', this.#onEscKeyDown);

    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);

    render(this.#controlsComponent, this.#descriptionWrapperComponent.element);

    this.#commentPresenter.init(this.#descriptionWrapperComponent.element, this.#movie.comments, this.#comments);

  }

  #handlePopupCloseClick = (evt) => {
    evt.preventDefault();
    this.#mainContainer.querySelector('.film-details').remove();
    this.#mainContainer.classList.remove('hide-overflow');
    window.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handlePopupCloseClick(evt);
    }
  };

}
