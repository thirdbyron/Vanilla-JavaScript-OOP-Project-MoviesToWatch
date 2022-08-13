import { generateMovieFish } from '../mock/generate-movie-fish.js';
import { MAX_MOVIES } from '../const.js';

export default class MoviesModel {
  #movies = Array.from({length: MAX_MOVIES}, generateMovieFish);

  get movies() {
    return this.#movies;
  }

  set movies(value) {
    this.#movies = value;
  }
}
