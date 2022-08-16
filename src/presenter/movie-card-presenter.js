import { render } from '../framework/render.js';

import PopupPresenter from './popup-presenter.js';
import MovieCardView from '../view/content/movie-card-view.js';


export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #comments = null;
  #bodyNode = null;
  #removePreviosPopup = null;
  #hideOverflow = null;
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

  init(moviesListComponent, movie, commentsModel, bodyNode, onRemovePreviosPopup, onHideOverflow) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = movie;
    this.#comments = commentsModel.comments;
    this.#bodyNode = bodyNode;
    this.#removePreviosPopup = onRemovePreviosPopup;
    this.#hideOverflow = onHideOverflow;
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
      this.#handleFavoriteClick();
    });
    this.#movieCardComponent.setWatchedClickHandler(() => {
      this.#handleWatchlistClick();
    });
    this.#movieCardComponent.setWatchlistClickHandler(() => {
      this.#handleWatchedClick();
    });
  }

  #presentPopup() {
    this.#popupPresenter.init(
      this.#bodyNode,
      this.#movie,
      [...this.#comments]
    );
    this.isPopupOpen = true;
  }

  #renderMovieCard() {
    render(this.#movieCardComponent, this.#moviesListComponent.element);
  }

  #handleFavoriteClick = () => {

  };

  #handleWatchlistClick = () => {

  };

  #handleWatchedClick = () => {

  };

}
