import { render } from '../render.js';

import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';
import MovieDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

import PopupCommentsPresenter from './popup-comments-presenter.js';

export default class PopupPresenter {

  #mainContainer = null;
  #previousPopup = null;

  #movie = null;
  #comments = null;

  #wrapperComponent = null;
  #contentComponent = null;
  #descriptionWrapperComponent = null;
  #controlsComponent = null;

  #commentPresenter = null;

  #onClickClose = () => {
    const currentPopup = this.#mainContainer.querySelector('.film-details');
    currentPopup.remove();
    this.#mainContainer.classList.remove('hide-overflow');
    window.removeEventListener('keydown', this.#onEscapeClose);
  };

  #onEscapeClose = (evt) => {
    if (evt.code === 'Escape') {
      this.#onClickClose();
    }
  };

  init(mainContainer, movie, comments) {

    this.#mainContainer = mainContainer;

    this.#movie = movie;
    this.#comments = comments;

    this.#previousPopup = mainContainer.querySelector('.film-details') || null;

    if (this.#previousPopup) {
      this.#previousPopup.remove();
    } else if (!(mainContainer.classList.contains('hide-overflow'))) {
      mainContainer.classList.add('hide-overflow');
    }

    this.#wrapperComponent = new PopupWrapperView;
    this.#contentComponent = new PopupContentView;
    this.#descriptionWrapperComponent = new MovieDescriptionWrapperView;
    this.#controlsComponent = new MovieControlsView;

    this.#commentPresenter = new PopupCommentsPresenter;

    render(this.#wrapperComponent, mainContainer);
    render(this.#contentComponent, this.#wrapperComponent.element);
    render(this.#descriptionWrapperComponent, this.#contentComponent.element);

    this.#descriptionWrapperComponent.element.children[0].children[0].addEventListener('click', this.#onClickClose);

    window.addEventListener('keydown', this.#onEscapeClose);

    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);

    render(this.#controlsComponent, this.#descriptionWrapperComponent.element);

    this.#commentPresenter.init(this.#descriptionWrapperComponent.element, this.#movie.comments, this.#comments);

  }

}

