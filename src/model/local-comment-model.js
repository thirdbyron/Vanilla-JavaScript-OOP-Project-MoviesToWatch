export default class LocalCommentModel {
  #comment = {
    comment: '',
    emotion: ''
  };

  get comment() {
    return this.#comment;
  }

  set comment(value) {
    this.#comment = value;
  }
}
