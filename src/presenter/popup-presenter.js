import { render, remove } from '../framework/render.js';
import MovieDescriptionPresenter from './movie-description-presenter.js';
import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';

export default class PopupPresenter {

  #mainContainer = null;
  #movie = null;
  #comments = null;
  #onChangeData = null;
  #wrapperComponent = null;
  #contentComponent = null;

  init(mainContainer, movie, comments, onChangeData) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#comments = comments;
    this.#onChangeData = onChangeData;

    this.#renderPopup();

  }

  #presentMovieDescription() {
    new MovieDescriptionPresenter().init(
      this.#contentComponent.element,
      this.#movie,
      this.#comments,
      this.#handlePopupCloseClick,
      this.#onChangeData
    );
  }

  #renderPopup() {
    this.#wrapperComponent = new PopupWrapperView;
    this.#contentComponent = new PopupContentView;

    render(this.#wrapperComponent, this.#mainContainer);
    render(this.#contentComponent, this.#wrapperComponent.element);

    window.addEventListener('keydown', this.#onEscKeyDown);

    this.#presentMovieDescription();
  }

  clear() {
    remove(this.#wrapperComponent);
    window.removeEventListener('keydown', this.#onEscKeyDown);
    document.querySelector('body').classList.remove('hide-overflow');
  }

  #handlePopupCloseClick = () => {
    this.clear();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.clear();
    }
  };

}
