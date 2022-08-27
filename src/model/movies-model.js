import { generateMovieFish } from '../mock/generate-movie-fish.js';
import { MAX_MOVIES } from '../const.js';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable {

  #moviesApiService = null;
  #movies = Array.from({ length: MAX_MOVIES }, generateMovieFish);

  constructor(moviesApiService) {
    super();

    this.#moviesApiService = moviesApiService;

    this.#moviesApiService.movies.then((movies) => {
      console.log(movies)
      console.log(movies.map(this.#adaptToClient))
    });

  }

  get movies() {
    return this.#movies;
  }

  set movies(value) {
    this.#movies = value;
  }

  setComments(comments) {
    for (let i = 0; i < this.#movies.length; i++) {
      this.#movies[i].comments = [];
      comments.filter((comment) => comment.movieId === this.#movies[i].id).forEach((comment) => {
        this.#movies[i].comments.push(comment.id);
      });
    }
  }

  updateMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  sortMovies = (updateType, update) => {
    this._notify(updateType, update);
  };

  #adaptToClient = (movie) => {
    const adaptedMovie = {
      ...movie,
      filmInfo: {
        ...movie.film_info,
        ageRating: movie.film_info.age_rating,
        alternativeTitle: movie.film_info.alternative_title,
        totalRating: movie.film_info.total_rating,
        release: {
          ...movie.film_info.release,
          releaseCountry: movie.film_info.release.release_country
        }
      },
      userDetails: {
        ...movie.user_details,
        watched: movie.user_details.already_watched,
        watchingDate: movie.user_details.watching_date,
      }
    };

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;
    delete adaptedMovie.filmInfo.age_rating;
    delete adaptedMovie.filmInfo.alternative_title;
    delete adaptedMovie.filmInfo.total_rating;
    delete adaptedMovie.filmInfo.release.release_country;
    delete adaptedMovie.userDetails.already_watched;
    delete adaptedMovie.userDetails.watching_date;

    return adaptedMovie;
  };
}


