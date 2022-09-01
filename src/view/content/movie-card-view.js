import { validateDescription, validateCommentsNumber } from '../../utils/movie-data.js';
import AbstractView from '../../framework/view/abstract-view.js';

const createMovieCardTemplate = (movie) => {

  const { title, totalRating, poster, release, runtime, genre, description } = movie.filmInfo;

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${release.year}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${validateDescription(description)}</p>
    <span class="film-card__comments">${validateCommentsNumber(movie.comments)}</span>
  </a>
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

  removeHandlers() {
    this.element.removeEventListener('click', this.#popupClickHandler);
  }

  #popupClickHandler = (evt) => {
    evt.preventDefault();
    if (Array.from(this.element.querySelectorAll('button')).every((button) => evt.target !== button)) {
      this._callback.openPopupClick();
    }
  };

}
