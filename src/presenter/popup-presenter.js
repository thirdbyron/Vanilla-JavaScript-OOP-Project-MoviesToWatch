import { render, remove } from '../framework/render.js';
import MovieDescriptionPresenter from './movie-description-presenter.js';
import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';

export default class PopupPresenter {

  #mainContainer = null;
  #movie = null;
  #commentsModel = null;
  #onChangeData = null;
  #moviesModel = null;
  #currentFilter = null;
  #scrollPosition = null;
  #turnPopupClose = null;
  #movieDescriptionPresenter = null;
  #wrapperComponent = null;
  #contentComponent = null;

  get popupScrollPosition() {
    return this.#wrapperComponent.scrollPosition;
  }


  init(mainContainer, movie, commentsModel, onChangeData, moviesModel, currentFilter, scrollPosition, turnPopupClose) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#commentsModel = commentsModel;
    this.#onChangeData = onChangeData;
    this.#moviesModel = moviesModel;
    this.#currentFilter = currentFilter;
    this.#scrollPosition = scrollPosition;
    this.#turnPopupClose = turnPopupClose;

    this.#renderPopup();

  }

  #presentMovieDescription() {
    this.#movieDescriptionPresenter = new MovieDescriptionPresenter;
    this.#movieDescriptionPresenter.init(
      this.#contentComponent.element,
      this.#movie,
      this.#commentsModel,
      this.#handlePopupCloseClick,
      this.#onChangeData,
      this.#moviesModel,
      this.#currentFilter
    );
  }

  getMovieDescriptionPresenter = () => this.#movieDescriptionPresenter;

  #renderPopup() {
    this.#wrapperComponent = new PopupWrapperView(this.#scrollPosition);
    this.#contentComponent = new PopupContentView;

    render(this.#wrapperComponent, this.#mainContainer);
    render(this.#contentComponent, this.#wrapperComponent.element);

    window.addEventListener('keydown', this.#onEscKeyDown);

    this.#presentMovieDescription();

    this.#wrapperComponent.setScrollPosition();
  }

  clear() {
    this.#turnPopupClose();
    this.#movieDescriptionPresenter.removeAddCommentHandler();
    remove(this.#wrapperComponent);
    window.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #handlePopupCloseClick = () => {
    document.querySelector('body').classList.remove('hide-overflow');
    this.clear();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.querySelector('body').classList.remove('hide-overflow');
      this.clear();
    }
  };

}
