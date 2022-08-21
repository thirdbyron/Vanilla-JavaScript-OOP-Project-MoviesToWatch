import { render, remove } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION, FILTER_FROM_DATA_TO_TYPE } from '../const.js';
import MovieCardView from '../view/content/movie-card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #comments = null;
  #bodyNode = null;
  #removePreviosPopup = null;
  #hideOverflow = null;
  #onChangeData = null;
  #currentFilter = null;
  #movieCardComponent = null;
  #popupPresenter = null;
  #isPopupOpen = false;

  get isPopupOpen() {
    return this.#isPopupOpen;
  }

  set isPopupOpen(value) {
    if (typeof value !== 'boolean') {
      throw new Error('Setter of this class needs a boolean arg');
    }
    this.#isPopupOpen = value;
  }


  init(moviesListComponent, movie, commentsModel, bodyNode, onRemovePreviosPopup, onHideOverflow, onChangeData, currentFilter) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = {...movie};
    this.#comments = commentsModel.comments;
    this.#bodyNode = bodyNode;
    this.#removePreviosPopup = onRemovePreviosPopup;
    this.#hideOverflow = onHideOverflow;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#movieCardComponent = new MovieCardView(this.#movie);
    this.#popupPresenter = new PopupPresenter;

    this.#renderMovieCard();

    this.#setHandlers();

  }

  destroy() {
    remove(this.#movieCardComponent);
  }

  clearPreviousPopup() {
    this.isPopupOpen = false;
    this.#popupPresenter.clear();
  }

  #setHandlers() {
    this.#movieCardComponent.setPopupClickHandler(() => {
      this.#removePreviosPopup();
      this.#hideOverflow();
      this.#presentPopup();
    });
    this.#movieCardComponent.setFavoriteClickHandler(() => {
      this.#handleControlButtonClick(this.#movieCardComponent.favoriteButtonElement);
    });
    this.#movieCardComponent.setWatchedClickHandler(() => {
      this.#handleControlButtonClick(this.#movieCardComponent.watchedButtonElement);
    });
    this.#movieCardComponent.setWatchlistClickHandler(() => {
      this.#handleControlButtonClick(this.#movieCardComponent.watchlistButtonElement);
    });
  }

  #presentPopup() {
    this.#popupPresenter.init(
      this.#bodyNode,
      this.#movie,
      [...this.#comments],
      this.#onChangeData
    );
    this.isPopupOpen = true;
  }

  #renderMovieCard() {
    render(this.#movieCardComponent, this.#moviesListComponent.element);
  }

  #changeMovieUserDetail(type) {
    this.#movie.user_details[type] = !(this.#movie.user_details[type]);
  }

  #handleControlButtonClick(buttonElement) {
    const filterType = this.#movieCardComponent.getButtonType(buttonElement);
    const isMinorUpdate = FILTER_FROM_DATA_TO_TYPE[filterType] === this.#currentFilter;

    this.#changeMovieUserDetail(filterType);

    this.#onChangeData(USER_ACTION.updateMovie, isMinorUpdate ? UPDATE_TYPE.minor : UPDATE_TYPE.patch, this.#movie);

    this.#movieCardComponent.toggleButtonClass(buttonElement);
  }

}
