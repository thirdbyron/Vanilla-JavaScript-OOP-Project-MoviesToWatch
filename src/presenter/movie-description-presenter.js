import { render } from '../framework/render.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MoviesDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';
import PopupCommentsPresenter from './popup-comments-presenter.js';

export default class MovieDescriptionPresenter {

  #mainContainer = null;
  #movie = null;
  #comments = null;
  #descriptionWrapperComponent = null;
  #controlsComponent = new MovieControlsView;

  init(mainContainer, movie, comments, handler) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#comments = comments;

    this.#renderDescription();

    this.#setDescriptionHandlers(handler);

    this.#presentPopupComments();

  }

  #presentPopupComments() {
    new PopupCommentsPresenter().init(
      this.#descriptionWrapperComponent.element,
      this.#movie.comments,
      this.#comments
    );
  }

  #setDescriptionHandlers(callback) {
    this.#descriptionWrapperComponent.setCloseClickHandler(callback);
  }

  #renderDescription() {
    this.#descriptionWrapperComponent = new MoviesDescriptionWrapperView;

    render(this.#descriptionWrapperComponent, this.#mainContainer);
    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);
    render(this.#controlsComponent, this.#descriptionWrapperComponent.element);
  }


}
