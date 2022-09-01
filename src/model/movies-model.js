import { UPDATE_TYPE } from '../const.js';
import { translateMinutesToRuntime, formatRawDateToRealeaseYear, formatRawDateToRealeaseDate, getNameOfSectionWithGenres, createGenresListTemplate } from '../utils/movie-data.js';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable {

  #moviesApiService = null;
  #movies = [];

  constructor(moviesApiService) {
    super();

    this.#moviesApiService = moviesApiService;

  }

  get movies() {
    return this.#movies;
  }

  set movies(value) {
    this.#movies = value;
  }

  init = async () => {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch (err) {
      this.#movies = [];
    }

    this._notify(UPDATE_TYPE.init);
  };

  updateMovie = async (updateType, update) => {

    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {

      const response = await this.#moviesApiService.updateMovie(update);
      const updatedMovie = this.#adaptToClient(response);

      this.#movies = [
        ...this.#movies.slice(0, index),
        updatedMovie,
        ...this.#movies.slice(index + 1),
      ];

      this._notify(updateType, update);

    } catch (err) {
      updateType = UPDATE_TYPE.error;
      this._notify(updateType, update);
      throw new Error('Can\'t update movie');
    }

  };

  sortMovies = (updateType, update) => {
    this._notify(updateType, update);
  };

  #adaptToClient = (movie) => {
    const adaptedMovie = {
      ...movie,
      filmInfo: {
        ...movie.film_info,
        rawRuntime: movie.film_info.runtime,
        runtime: movie.film_info.runtime !== null && movie.film_info.runtime > 0 ? translateMinutesToRuntime(movie.film_info.runtime) : '',
        ageRating: movie.film_info.age_rating,
        alternativeTitle: movie.film_info.alternative_title,
        totalRating: movie.film_info.total_rating,
        release: {
          rawDate: movie.film_info.release.date,
          fullDate: movie.film_info.release.date !== null ? formatRawDateToRealeaseDate(movie.film_info.release.date) : '',
          year: movie.film_info.release.date !== null ? formatRawDateToRealeaseYear(movie.film_info.release.date) : '',
          country: movie.film_info.release.release_country
        },
        genreSectionName: getNameOfSectionWithGenres(movie.film_info.genre),
        genreListTemplate: createGenresListTemplate(movie.film_info.genre),
        actorsList: movie.film_info.actors.join(', '),
        writersList: movie.film_info.writers.join(', '),
      },
      userDetails: {
        ...movie.user_details,
        watched: movie.user_details.already_watched,
        watchingDate: movie.user_details.watching_date,
      },
      isPopupChange: null,
      isCommentsChange: null,
    };

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;
    delete adaptedMovie.filmInfo.age_rating;
    delete adaptedMovie.filmInfo.alternative_title;
    delete adaptedMovie.filmInfo.total_rating;
    delete adaptedMovie.filmInfo.actors;
    delete adaptedMovie.filmInfo.writers;
    delete adaptedMovie.filmInfo.release.release_country;
    delete adaptedMovie.userDetails.already_watched;
    delete adaptedMovie.userDetails.watching_date;

    return adaptedMovie;
  };
}


