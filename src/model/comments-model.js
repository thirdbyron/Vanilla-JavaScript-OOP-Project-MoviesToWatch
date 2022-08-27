export default class CommentsModel {
  #comments = [];

  get comments() {
    return this.#comments;
  }

  set comments(value) {
    this.#comments = value;
  }

  addComment = (comment) => {
    this.#comments = [
      ...this.#comments,
    ];

  };

  deleteComment = (commentToDelete) => {
    const index = this.comments.findIndex((comment) => comment.id === commentToDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.comments = [
      ...this.comments.slice(0, index),
      ...this.comments.slice(index + 1),
    ];

  };

}
