import { generateMovieFish } from '../mock/generate-movie-fish.js';
import { MAX_MOVIES } from '../const.js';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable {
  #movies = Array.from({ length: MAX_MOVIES }, generateMovieFish);

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

}
