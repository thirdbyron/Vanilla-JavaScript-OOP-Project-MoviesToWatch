import { render } from '../framework/render.js';

import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MoviesDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

import PopupCommentsPresenter from './popup-comments-presenter.js';

export default class MovieDescriptionPresenter {

  #mainContainer = null;
  #movie = null;
  #comments = null;

  #descriptionWrapperComponent = new MoviesDescriptionWrapperView;
  #controlsComponent = new MovieControlsView;

  init(mainContainer, movie, comments, handler) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#comments = comments;

    render(this.#descriptionWrapperComponent, this.#mainContainer);

    this.#descriptionWrapperComponent.setCloseClickHandler(handler);

    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);

    render(this.#controlsComponent, this.#descriptionWrapperComponent.element);

    new PopupCommentsPresenter().init(
      this.#descriptionWrapperComponent.element,
      this.#movie.comments,
      this.#comments
    );
  }

}
