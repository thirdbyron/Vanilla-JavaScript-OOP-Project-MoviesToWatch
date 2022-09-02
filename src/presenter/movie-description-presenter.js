import { remove, render } from '../framework/render.js';
import ControlButtonsPresenter from './control-buttons-presenter.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MoviesDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import PopupCommentsPresenter from './popup-comments-presenter.js';

export default class MovieDescriptionPresenter {

  #mainContainer = null;
  #movie = null;
  #commentsModel = null;
  #descriptionWrapperComponent = null;
  #closeHandler = null;
  #onChangeData = null;
  #currentFilter = null;
  #onDisableControllButtons = null;
  #controlButtonsPresenter = null;
  #popupCommentsPresenter = null;

  get movie() {
    return this.#movie;
  }

  set movie(value) {
    this.#movie = value;
  }

  init(mainContainer, movie, commentsModel, closeHandler, onChangeData, currentFilter, onDisableControllButtons) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#commentsModel = commentsModel;
    this.#closeHandler = closeHandler;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#onDisableControllButtons = onDisableControllButtons;

    this.#controlButtonsPresenter = new ControlButtonsPresenter(this.#movie);

    this.#renderDescription();

    this.#presentControlButtons();

    this.#presentPopupComments();
  }

  setMovie(newMovie) {
    this.#movie = newMovie;
    this.#controlButtonsPresenter.movie = newMovie;
    this.#popupCommentsPresenter.movie = newMovie;
  }

  removeAddCommentHandler = () => {
    this.#popupCommentsPresenter.removeAddCommentHandler();
  };

  clearCommentObserver() {
    this.#popupCommentsPresenter.clearCommentObserver();
  }

  rerenderControllButtons() {
    this.#controlButtonsPresenter.rerenderControllButtons();
  }

  disablePopupControlButtons(isDisabled) {
    this.#controlButtonsPresenter.disableControlButtons(isDisabled);
  }

  shakePopupControlButtons() {
    this.#controlButtonsPresenter.shakeElementWhileError();
  }

  destroy() {
    remove(this.#descriptionWrapperComponent);
  }

  showCommentsChangeMovieModelError = () => {
    this.#popupCommentsPresenter.showMovieModelError();
  };

  #presentControlButtons() {
    this.#controlButtonsPresenter.init(
      this.#descriptionWrapperComponent.element,
      this.#movie,
      this.#onChangeData,
      this.#currentFilter,
      this.#onDisableControllButtons
    );
  }

  #presentPopupComments() {
    this.#popupCommentsPresenter = new PopupCommentsPresenter;
    this.#popupCommentsPresenter.init(
      this.#descriptionWrapperComponent.element,
      this.#commentsModel,
      this.#onChangeData,
      this.#movie
    );
  }

  #renderDescription() {
    this.#descriptionWrapperComponent = new MoviesDescriptionWrapperView;

    render(this.#descriptionWrapperComponent, this.#mainContainer);

    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);

    this.#descriptionWrapperComponent.setCloseClickHandler(this.#closeHandler);
  }

}
