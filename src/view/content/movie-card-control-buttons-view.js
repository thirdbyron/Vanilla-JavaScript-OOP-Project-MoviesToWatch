import { FILTER_TYPE } from '../../const.js';
import AbstractView from '../../framework/view/abstract-view.js';

const createMovieCardControlButtonsTemplate = (movie) => {

  const {watchlist, watched, favorite} = movie.userDetails;

  return `
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>`;
};

export default class MovieCardControlButtonsView extends AbstractView {

  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCardControlButtonsTemplate(this.#movie);
  }

  get favoriteButtonElement() {
    return this.element.querySelector('.film-card__controls-item--favorite');
  }

  get watchlistButtonElement() {
    return this.element.querySelector('.film-card__controls-item--add-to-watchlist');
  }

  get watchedButtonElement() {
    return this.element.querySelector('.film-card__controls-item--mark-as-watched');
  }

  getButtonType(buttonElement) {
    const buttonType = Object.keys(FILTER_TYPE).find((key) => buttonElement.className.includes(key));
    return buttonType;
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.favoriteButtonElement.addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.watchlistButtonElement.addEventListener('click', this.#watchlistClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.watchedButtonElement.addEventListener('click', this.#watchedClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  removeHandlers() {
    this.watchedButtonElement.removeEventListener('click', this.#watchedClickHandler);
    this.watchlistButtonElement.removeEventListener('click', this.#watchlistClickHandler);
    this.favoriteButtonElement.removeEventListener('click', this.#favoriteClickHandler);
  }

  disableControlButtons = (isDisabled) => {
    this.element.querySelectorAll('button').forEach((button) => {
      button.disabled = isDisabled;
    });
  };

}
