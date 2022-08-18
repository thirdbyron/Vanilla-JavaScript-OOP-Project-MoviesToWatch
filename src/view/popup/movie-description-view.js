import { formatRawDateToRealeaseDate, translateMinutesToRuntime } from '../../utils/movie-data.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

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

  const {
    film_info: {
      title,
      total_rating: totalRating,
      poster,
      age_rating: ageRating,
      director,
      description,
      release: {
        release_country: releaseCountry,
      }
    },
    writersList,
    actorsList,
    releaseDate,
    timeDuration,
    genreSectionName,
    genreListTemplate
  } = movie;

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
        <td class="film-details__cell">${writersList}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actorsList}</td>
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
        <td class="film-details__cell">${releaseCountry}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">${genreSectionName}</td>
        <td class="film-details__cell">
          ${genreListTemplate}
      </tr>
    </table>
  
    <p class="film-details__film-description">
    ${description}
    </p>
  </div>
  </div>`;
};

export default class MovieDescriptionView extends AbstractStatefulView {


  constructor(movie) {
    super();
    this._state = MovieDescriptionView.parseMovieToState(movie);
  }

  get template() {
    return createMovieDescriptionTemplate(this._state);
  }

  static parseMovieToState = (movie) => {

    const { writers, actors, release, runtime, genre } = movie.film_info;

    return {
      ...movie,
      releaseDate: release.date !== null ? formatRawDateToRealeaseDate(release.date) : '',
      timeDuration: runtime !== null && runtime > 0 ? translateMinutesToRuntime(runtime) : '',
      genreSectionName: getNameOfSectionWithGenres(genre),
      genreListTemplate: createGenresListTemplate(genre),
      actorsList: actors.join(', '),
      writersList: writers.join(', '),
    };
  };

}
