import AbstractView from '../../framework/view/abstract-view.js';

const createMovieDescriptionTemplate = (movie) => {

  const {poster, ageRating, title, alternativeTitle, totalRating, director, writersList, actorsList, release, runtime, genreSectionName, genreListTemplate, description} = movie.filmInfo;

  return `<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="">
  
    <p class="film-details__age">${ageRating}+</p>
  </div>
  
  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${alternativeTitle}</p>
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
        <td class="film-details__cell">${release.fullDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${runtime}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${release.country}</td>
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

export default class MovieDescriptionView extends AbstractView {

  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieDescriptionTemplate(this.#movie);
  }

}
