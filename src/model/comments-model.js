import { USER_ACTION } from '../const.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {

  #comments = [];
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();

    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  set comments(value) {
    this.#comments = value;
  }

  init = async (updateType, movieId) => {
    try {
      const commentsData = await this.#commentsApiService.getComments(movieId);
      this.#comments = commentsData;
      this._notify(updateType);
    } catch (err) {
      this.#comments = [];
      const initCommentsError = true;
      this._notify(updateType, initCommentsError);
    }
  };

  addComment = async (updateType, newComment, movie) => {
    try {
      const response = await this.#commentsApiService.addComment(newComment, movie.id);
      this.#comments = response.comments;

      this._notify(updateType);
    } catch (err) {
      const commentToAddError = { type: USER_ACTION.addComment };
      this._notify(updateType, commentToAddError);
    }

  };

  deleteComment = async (updateType, commentToDelete) => {
    const index = this.comments.findIndex((comment) => comment.id === commentToDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(commentToDelete);

      this.comments = [
        ...this.comments.slice(0, index),
        ...this.comments.slice(index + 1),
      ];

      this._notify(updateType);

    } catch (err) {
      const commentToDeleteError = { commentId: commentToDelete.id, type: USER_ACTION.deleteComment };
      this._notify(updateType, commentToDeleteError);
    }

  };

}

