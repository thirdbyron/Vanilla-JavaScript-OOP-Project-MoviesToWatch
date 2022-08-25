import { render, remove, replace } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION, FILTER_FROM_DATA_TO_TYPE } from '../const.js';
import MovieCardView from '../view/content/movie-card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #isPopupOnly = null;
  #commentsModel = null;
  #bodyNode = null;
  #removePreviosPopup = null;
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


  init(moviesListComponent, movie, isPopupOnly, commentsModel, bodyNode, onRemovePreviosPopup, onHideOverflow, onChangeData, currentFilter, moviesModel) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = movie;
    this.#isPopupOnly = isPopupOnly;
    this.#commentsModel = commentsModel;
    this.#bodyNode = bodyNode;
    this.#removePreviosPopup = onRemovePreviosPopup;
    this.#hideOverflow = onHideOverflow;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#moviesModel = moviesModel;
    this.#popupPresenter = new PopupPresenter;

    this.#renderMovieCard(this.#movie);

  }

  presentMovieCardForPopup() {
    this.#presentPopup();
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

  getPopupPresenter = () => this.#popupPresenter;

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
      this.#commentsModel,
      this.#onChangeData,
      this.#moviesModel,
      this.#currentFilter,
      this.#handlePopupClose
    );
    this.isPopupOpen = true;
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

    this.#changeMovieUserDetail(filterType);

    this.#onChangeData(USER_ACTION.updateMovie, UPDATE_TYPE.minor, this.#movie);

  }

  #handlePopupClose = () => {
    this.isPopupOpen = false;
  };


}
