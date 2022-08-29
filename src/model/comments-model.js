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
    } catch (err) {
      this.#comments = [];
    }

    this._notify(updateType);
  };

  addComment = () => {
    this.#comments = [
      ...this.#comments,
    ];

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
      throw new Error('Can\'t delete comment');
    }

  };

}
