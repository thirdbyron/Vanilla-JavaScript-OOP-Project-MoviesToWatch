import AbstractStatefulView from '../../../framework/view/abstract-stateful-view.js';

const createMovieAddCommentFormtTemplate = (state) => `<form class="film-details__new-comment" action="" method="get">
<div class="film-details__add-emoji-label">${state.emojiImgTemplate}</div>

<label class="film-details__comment-label">
  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
</label>

<div class="film-details__emoji-list">
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
  <label class="film-details__emoji-label" for="emoji-smile">
    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
  <label class="film-details__emoji-label" for="emoji-sleeping">
    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
  <label class="film-details__emoji-label" for="emoji-puke">
    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
  <label class="film-details__emoji-label" for="emoji-angry">
    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
  </label>
</div>
</form>`;

export default class MovieAddCommentFormView extends AbstractStatefulView {

  constructor(comment) {
    super();

    this._state = MovieAddCommentFormView.parseCommentToState(comment);

    this.#setHandlers();
  }

  get template() {
    return createMovieAddCommentFormtTemplate(this._state);
  }

  get emojiInputElements() {
    return this.element.querySelectorAll('.film-details__emoji-item');
  }

  get commentInputElement() {
    return this.element.querySelector('.film-details__comment-input');
  }

  #setHandlers() {
    this.emojiInputElements.forEach((item) => item.addEventListener('click', this.#choosingEmojiHandler));
    this.commentInputElement.addEventListener('change', this.#commentInputChangeHandler);
  }

  #choosingEmojiHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value === this._state.emotion) {
      this.updateElement({
        emotion: '',
        emojiImgTemplate: '',
      });
    } else {
      this.updateElement({
        emotion: `${evt.target.value}`,
        emojiImgTemplate: `<img src="./images/emoji/${evt.target.value}.png" width="100%" height="100%" alt="emoji"></img>`
      });
      this.#checkForActiveEmoji();
    }
  };

  #checkForActiveEmoji() {
    if (this._state.emotion) {
      Array.from(this.emojiInputElements).find((item) => item.value === this._state.emotion).checked = true;
    }
  }

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({ comment: evt.target.value });
  };

  _restoreHandlers = () => {
    this.#setHandlers();
  };

  static parseStateToComment = (state) => {
    const comment = {...state};

    delete comment.emojiImgTemplate;

    return comment;
  };

  static parseCommentToState = (comment) => ({
    ...comment,
    emojiImgTemplate: '',
  });

}

