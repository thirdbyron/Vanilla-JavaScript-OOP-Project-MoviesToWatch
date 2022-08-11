import { generateCommentFish } from '../mock/generate-comment-fish.js';

export default class CommentsModel {
  _comments = Array.from({length: 10}, generateCommentFish);

  get comments() {
    return this._comments;
  }
}
