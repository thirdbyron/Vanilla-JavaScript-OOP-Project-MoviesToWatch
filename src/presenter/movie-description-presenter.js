import { render } from '../framework/render.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MoviesDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import PopupCommentsPresenter from './popup-comments-presenter.js';
import ControlButtonsPresenter from './control-buttons-presenter.js';

export default class MovieDescriptionPresenter {

  #mainContainer = null;
  #movie = null;
  #comments = null;
  #descriptionWrapperComponent = null;
  #closeHandler = null;
  #onChangeData = null;
  #controlButtonsPresenter = null;
  #popupCommentsPresenter = null;

  init(mainContainer, movie, comments, closeHandler, onChangeData) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#comments = comments;
    this.#closeHandler = closeHandler;
    this.#onChangeData = onChangeData;
    this.#descriptionWrapperComponent = new MoviesDescriptionWrapperView;
    this.#controlButtonsPresenter = new ControlButtonsPresenter;
    this.#popupCommentsPresenter = new PopupCommentsPresenter;

    this.#renderDescription();

    this.#presentControlButtons();

    this.#presentPopupComments();

  }

  #presentControlButtons() {
    this.#controlButtonsPresenter.init(
      this.#descriptionWrapperComponent.element,
      this.#movie,
      this.#onChangeData
    );
  }

  #presentPopupComments() {
    this.#popupCommentsPresenter.init(
      this.#descriptionWrapperComponent.element,
      this.#movie.comments,
      this.#comments
    );
  }

  #renderDescription() {
    render(this.#descriptionWrapperComponent, this.#mainContainer);

    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);

    this.#descriptionWrapperComponent.setCloseClickHandler(this.#closeHandler);
  }

}
