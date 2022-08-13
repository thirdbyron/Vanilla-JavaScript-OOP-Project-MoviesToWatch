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

<<<<<<< HEAD
  #handlePopupCloseClick = (evt) => {
    evt.preventDefault();
=======
  #handlePopupCloseClick = () => {
>>>>>>> 23068dbe956869801d40de6c91d4cc0a0977e3a0
    this.#mainContainer.querySelector('.film-details').remove();
    this.#mainContainer.classList.remove('hide-overflow');
    window.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
<<<<<<< HEAD
      this.#handlePopupCloseClick(evt);
=======
      this.#handlePopupCloseClick();
>>>>>>> 23068dbe956869801d40de6c91d4cc0a0977e3a0
    }
  };

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

<<<<<<< HEAD
    this.#descriptionWrapperComponent.closeButtonElement.addEventListener('click', this.#handlePopupCloseClick);
=======
    this.#descriptionWrapperComponent.element.children[0].children[0].addEventListener('click', this.#handlePopupCloseClick);
>>>>>>> 23068dbe956869801d40de6c91d4cc0a0977e3a0

    window.addEventListener('keydown', this.#onEscKeyDown);

    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);

    render(this.#controlsComponent, this.#descriptionWrapperComponent.element);

    this.#commentPresenter.init(this.#descriptionWrapperComponent.element, this.#movie.comments, this.#comments);

  }

}
