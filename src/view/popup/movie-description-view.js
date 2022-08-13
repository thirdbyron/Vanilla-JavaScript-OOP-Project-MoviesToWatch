import { createElement } from '../../render.js';
import { formatRawDateToRealeaseDate, translateMinutesToRuntime } from '../../utils.js';

const getNameOfSectionWithGenres = (genres) => genres.length > 1 ? 'Genres' : 'Genre';

const createGenresListTemplate = (genres) => {
  if (genres.length > 0) {
    let genresListTemplate = '';
    for (let i = 0; i < genres.length; i++) {
      genresListTemplate += `<span class="film-details__genre">${genres[i]}</span>`;
    }
    return genresListTemplate;
  }
  return '';
};

const createMovieDescriptionTemplate = (movie) => {

  const {title, total_rating: totalRating, poster, age_rating: ageRating, director, writers, actors, release, runtime, genre, description } = movie.film_info;

  const releaseDate = release.date !== null ? formatRawDateToRealeaseDate(release.date) : '';

  const timeDuration = runtime !== null && runtime > 0 ? translateMinutesToRuntime(runtime) : '';

  return `<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="">
  
    <p class="film-details__age">${ageRating}+</p>
  </div>
  
  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${title}</p>
      </div>
  
      <div class="film-details__rating">
        <p class="film-details__total-rating">${totalRating}</p>
      </div>
    </div>
  
    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writers.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${releaseDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${timeDuration}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${release.release_country}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">${getNameOfSectionWithGenres(genre)}</td>
        <td class="film-details__cell">
          ${createGenresListTemplate(genre)}
      </tr>
    </table>
  
    <p class="film-details__film-description">
    ${description}
    </p>
  </div>
  </div>`;
};

export default class MovieDescriptionView {
  #element = null;
  #movie = null;

  constructor (movie) {
    this.#movie = movie;
  }

  get template() {
    return createMovieDescriptionTemplate(this.#movie);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
