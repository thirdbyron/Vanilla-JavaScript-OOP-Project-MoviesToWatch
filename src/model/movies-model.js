import { generateMovieFish } from '../mock/generate-movie-fish.js';

export default class MoviesModel {
  #movies = Array.from({length: 5}, generateMovieFish);

  get movies() {
    return this.#movies;
  }

  set movies(value) {
    this.#movies = value;
  }
}
