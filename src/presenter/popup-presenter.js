import { render } from '../render.js';

import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';
import MovieDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

import PopupCommentsPresenter from './popup-comments-presenter.js';

export default class PopupPresenter {

  #previousPopup = null;
  #currentPopup = null;

  #movie = null;
  #comments = null;

  #wrapperComponent = null;
  #contentComponent = null;
  #descriptionWrapperComponent = null;
  #controlsComponent = null;

  #commentPresenter = null;

  init(mainContainer, movie, comments) {

    this.#movie = movie;
    this.#comments = comments;

    this.#previousPopup = mainContainer.querySelector('.film-details') || null;

    if (this.#previousPopup) {
      this.#previousPopup.remove();
    }

    this.#wrapperComponent = new PopupWrapperView;
    this.#contentComponent = new PopupContentView;
    this.#descriptionWrapperComponent = new MovieDescriptionWrapperView;
    this.#controlsComponent = new MovieControlsView;

    this.#commentPresenter = new PopupCommentsPresenter;

    render(this.#wrapperComponent, mainContainer);
    render(this.#contentComponent, this.#wrapperComponent.element);
    render(this.#descriptionWrapperComponent, this.#contentComponent.element);

    this.#currentPopup = mainContainer.querySelector('.film-details');

    this.#descriptionWrapperComponent.element.children[0].children[0].addEventListener('click', () => {
      this.#currentPopup.remove();
    });

    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);

    render(this.#controlsComponent, this.#descriptionWrapperComponent.element);

    this.#commentPresenter.init(this.#descriptionWrapperComponent.element, this.#movie.comments, this.#comments);

  }

}

