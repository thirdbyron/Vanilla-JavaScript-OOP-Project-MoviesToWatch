import { render } from '../framework/render.js';
import PopupPresenter from './popup-presenter.js';
import MovieCardView from '../view/content/movie-card-view.js';
import { FILTER_FROM_DATA } from '../const.js';

export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #comments = null;
  #bodyNode = null;
  #removePreviosPopup = null;
  #hideOverflow = null;
  #onChangeData = null;
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

  set movie(value) {
    this.#movie = value;
  }

  get movie() {
    return this.#movie;
  }

  init(moviesListComponent, movie, commentsModel, bodyNode, onRemovePreviosPopup, onHideOverflow, onChangeData) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = movie;
    this.#comments = commentsModel.comments;
    this.#bodyNode = bodyNode;
    this.#removePreviosPopup = onRemovePreviosPopup;
    this.#hideOverflow = onHideOverflow;
    this.#onChangeData = onChangeData;
    this.#movieCardComponent = new MovieCardView(this.#movie);
    this.#popupPresenter = new PopupPresenter;

    this.#renderMovieCard();

    this.#setHandlers();

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
      this.#onChangeData(this.#movie, FILTER_FROM_DATA.favorites);
    });
    this.#movieCardComponent.setWatchedClickHandler(() => {
      this.#onChangeData(this.#movie, FILTER_FROM_DATA.watched);
    });
    this.#movieCardComponent.setWatchlistClickHandler(() => {
      this.#onChangeData(this.#movie, FILTER_FROM_DATA.watchlist);
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

}
