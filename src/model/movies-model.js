import { generateMovieFish } from '../mock/generate-movie-fish.js';

export default class MoviesModel {
  _movies = Array.from({length: 5}, generateMovieFish);

  get movies() {
    return this._movies;
  }
}
