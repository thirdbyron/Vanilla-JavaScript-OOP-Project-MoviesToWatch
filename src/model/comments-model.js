import { generateCommentFish } from '../mock/generate-comment-fish.js';

export default class CommentsModel {
  #comments = Array.from({length: 10}, generateCommentFish);

  get comments() {
    return this.#comments;
  }

  set comments(value) {
    this.#comments = value;
  }
}
