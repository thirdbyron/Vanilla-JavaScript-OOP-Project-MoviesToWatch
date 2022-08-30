export default class TempCommentModel {
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

  reset() {
    this.#comment = {
      comment: '',
      emotion: ''
    };
  }
}
