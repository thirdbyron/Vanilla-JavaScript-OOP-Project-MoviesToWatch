import { render, remove, replace } from '../framework/render.js';
import { FILTER_FROM_DATA_TO_TYPE, UPDATE_TYPE, USER_ACTION } from '../const.js';
import MovieCardView from '../view/content/movie-card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #isPopupOnly = null;
  #commentsModel = null;
  #bodyNode = null;
  #removePreviousPopup = null;
  #hideOverflow = null;
  #onChangeData = null;
  #currentFilter = null;
  #moviesModel = null;
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

  get movie() {
    return this.#movie;
  }

  get isPopupOnly() {
    return this.#isPopupOnly;
  }


  init(moviesListComponent, movie, isPopupOnly, commentsModel, bodyNode, onRemovePreviousPopup, onHideOverflow, onChangeData, currentFilter, moviesModel) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = movie;
    this.#isPopupOnly = isPopupOnly;
    this.#commentsModel = commentsModel;
    this.#bodyNode = bodyNode;
    this.#removePreviousPopup = onRemovePreviousPopup;
    this.#hideOverflow = onHideOverflow;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#moviesModel = moviesModel;

    this.#popupPresenter = new PopupPresenter;

    this.#renderMovieCard(this.#movie);

  }

  destroy() {
    this.#movieCardComponent.removeHandlers();
    remove(this.#movieCardComponent);
    if (this.isPopupOpen) {
      this.clearPreviousPopup();
    }
  }

  clearPreviousPopup() {
    this.#popupPresenter.clear();
  }

  rerenderMovieCard(movie) {
    const newMovieCardComponent = new MovieCardView(movie);

    replace(newMovieCardComponent, this.#movieCardComponent);

    this.#movieCardComponent = newMovieCardComponent;

    this.#setHandlers();

    if (this.isPopupOpen) {
      this.#popupPresenter.getMovieDescriptionPresenter().rerenderControllButtons(movie);
    }
  }

  #setHandlers() {
    this.#movieCardComponent.setPopupClickHandler(() => {
      this.#removePreviousPopup();
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
    this.isPopupOpen = true;
    this.#popupPresenter.init(
      this.#bodyNode,
      this.#movie,
      this.#commentsModel,
      this.#onChangeData,
      this.#moviesModel,
      this.#currentFilter,
      this.#handlePopupClose
    );
  }

  rerenderPopupControllButtons(movie) {
    this.#popupPresenter.getMovieDescriptionPresenter().rerenderControllButtons(movie);
  }

  rerenderCommentsList(movie) {
    this.#popupPresenter.getMovieDescriptionPresenter().rerenderCommentsList(movie);
  }

  #renderMovieCard(movie) {
    this.#movieCardComponent = new MovieCardView(movie);

    if (this.#isPopupOnly) {
      this.#presentPopup();
    }

    render(this.#movieCardComponent, this.#moviesListComponent.element);

    this.#setHandlers();
  }

  #changeMovieUserDetail(type) {
    this.#movie.user_details[type] = !(this.#movie.user_details[type]);
  }

  #handleControlButtonClick(buttonElement) {
    const filterType = this.#movieCardComponent.getButtonType(buttonElement);

    const isMinorUpdate = FILTER_FROM_DATA_TO_TYPE[filterType] === this.#currentFilter;

    this.#changeMovieUserDetail(filterType);

    this.#onChangeData(USER_ACTION.updateMovie, isMinorUpdate ? UPDATE_TYPE.minor : UPDATE_TYPE.patch, this.#movie);

  }

  #handlePopupClose = () => {
    this.isPopupOpen = false;
  };


}
