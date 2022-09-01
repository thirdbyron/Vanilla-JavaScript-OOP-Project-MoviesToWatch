import AbstractView from '../../framework/view/abstract-view.js';
import { FILTER_TYPE } from '../../const.js';

const createMovieControlsTemplate = (movie) => {

  const {watchlist, watched, favorite} = movie.userDetails;

  return `<section class="film-details__controls">
  <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button film-details__control-button--watched ${watched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
  </section>`;
};

export default class MovieControlsView extends AbstractView{

  #movie = null;

  constructor(movie) {
    super();

    this.#movie = movie;
  }

  get template() {
    return createMovieControlsTemplate(this.#movie);
  }

  get favoriteButtonElement() {
    return this.element.querySelector('#favorite');
  }

  get watchedButtonElement() {
    return this.element.querySelector('#watched');
  }

  get watchlistButtonElement() {
    return this.element.querySelector('#watchlist');
  }

  getButtonType(buttonElement) {
    const buttonType = Object.keys(FILTER_TYPE).find((key) => FILTER_TYPE[key] === FILTER_TYPE[buttonElement.id]);
    return buttonType;
  }

  disableControlButtons = (isDisabled) => {
    this.element.querySelectorAll('button').forEach((button) => {
      button.disabled = isDisabled;
    });
  };

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

}
