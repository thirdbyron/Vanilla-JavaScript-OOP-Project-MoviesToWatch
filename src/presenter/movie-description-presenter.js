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
  #moviesModel = null;
  #currentFilter = null;
  #controlButtonsPresenter = null;
  #popupCommentsPresenter = null;

  init(mainContainer, movie, commentsModel, closeHandler, onChangeData, moviesModel, currentFilter) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#commentsModel = commentsModel;
    this.#closeHandler = closeHandler;
    this.#onChangeData = onChangeData;
    this.#moviesModel = moviesModel;
    this.#currentFilter = currentFilter;

    this.#controlButtonsPresenter = new ControlButtonsPresenter(this.#movie);

    this.#renderDescription();

    this.#presentControlButtons();

    this.#presentPopupComments();

  }

  removeAddCommentHandler = () => {
    this.#popupCommentsPresenter.removeAddCommentHandler();
  };

  rerenderControllButtons(movie) {
    this.#controlButtonsPresenter.rerenderControllButtons(movie);
  }

  rerenderCommentsList(movie) {
    this.#popupCommentsPresenter.rerenderCommentsList(movie);
  }

  #presentControlButtons() {
    this.#controlButtonsPresenter.init(
      this.#descriptionWrapperComponent.element,
      this.#movie,
      this.#onChangeData,
      this.#currentFilter
    );
  }

  destroy() {
    remove(this.#descriptionWrapperComponent);
  }

  #presentPopupComments() {
    this.#popupCommentsPresenter = new PopupCommentsPresenter;
    this.#popupCommentsPresenter.init(
      this.#descriptionWrapperComponent.element,
      this.#moviesModel,
      this.#commentsModel,
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
