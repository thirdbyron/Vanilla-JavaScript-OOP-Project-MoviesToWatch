import { generateCommentFish } from '../mock/generate-comment-fish.js';
import { MAX_MOVIE_COMENTS } from '../const.js';

export default class CommentsModel {
  #comments = Array.from({length: MAX_MOVIE_COMENTS}, generateCommentFish);

  get comments() {
    return this.#comments;
  }

  set comments(value) {
    this.#comments = value;
  }
}
