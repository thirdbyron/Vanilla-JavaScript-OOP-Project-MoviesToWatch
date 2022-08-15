import AbstractView from '../../framework/view/abstract-view.js';
import { formatRawDateToRealeaseYear, translateMinutesToRuntime, validateDescription, validateCommentsNumber } from '../../utils/movie-data.js';


const createMovieCardTemplate = (movie) => {

  const {title, total_rating: totalRating, poster, release, runtime, genre, description } = movie.film_info;

  const rawDate = release.date;
  const releaseYear = rawDate !== null ? formatRawDateToRealeaseYear(rawDate) : '';

  const timeDuration = runtime !== null && runtime > 0 ? translateMinutesToRuntime(runtime) : '';

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${timeDuration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${validateDescription(description)}</p>
    <span class="film-card__comments">${validateCommentsNumber(movie.comments)}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class MovieCardView extends AbstractView {

  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }

  setPopupClickHandler = (callback) => {
    this._callback.openPopupClick = callback;
    this.element.addEventListener('click', this.#popupClickHandler);
  };

  #popupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPopupClick();
  };

}
