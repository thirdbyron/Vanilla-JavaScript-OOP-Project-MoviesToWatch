import { KEYS_CODE } from '../../../const.js';
import AbstractStatefulView from '../../../framework/view/abstract-stateful-view.js';
import he from 'he';

const createMovieAddCommentFormtTemplate = (state) => `<form class="film-details__new-comment" action="" method="get">
<div class="film-details__add-emoji-label">${state.emojiImgTemplate}</div>

<label class="film-details__comment-label">
  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${state.comment !== '' ? he.encode(state.comment) : ''}</textarea>
  ${state.error}
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

  static parseStateToComment = (state) => {
    const comment = { ...state };

    delete comment.emojiImgTemplate;
    delete comment.error;

    return comment;
  };

  static parseCommentToState = (comment) => ({
    ...comment,
    emojiImgTemplate: '',
    error: ''
  });

  #setHandlers() {
    this.emojiInputElements.forEach((item) => item.addEventListener('click', this.#choosingEmojiHandler));
    this.commentInputElement.addEventListener('input', this.#commentInputChangeHandler);
  }

  #choosingEmojiHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value === this._state.emotion) {
      this.updateElement({
        emotion: '',
        emojiImgTemplate: '',
        error: ''
      });
    } else {
      this.updateElement({
        emotion: `${evt.target.value}`,
        emojiImgTemplate: `<img src="./images/emoji/${evt.target.value}.png" width="100%" height="100%" alt="emoji"></img>`,
        error: ''
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

  setAddCommentHandler(callback) {
    this._callback.addComment = callback;
    document.addEventListener('keyup', this.#addCommentHandler);
  }

  removeAddCommentHandler() {
    document.removeEventListener('keyup', this.#addCommentHandler);
  }

  #disableFormDuringPosting(isDisabled) {
    this.removeAddCommentHandler();
    this.element.querySelectorAll('input, textarea').forEach((formEl) => {
      formEl.disabled = isDisabled;
    });
  }

  #addCommentHandler = (evt) => {
    evt.preventDefault();
    if ((evt.ctrlKey || evt.metaKey) && (evt.keyCode === KEYS_CODE.enter)) {
      if (this._state.comment === '' || this._state.emotion === '') {
        this.shake(this.updateElement({
          emotion: '',
          emojiImgTemplate: '',
          error: '<p> Choose emotion and write something </p>'
        }));
      } else {
        this._callback.addComment(MovieAddCommentFormView.parseStateToComment(this._state));
        this.#disableFormDuringPosting(true);
      }

    }
  };

  handleResponseAfterAddComment(isError = null) {
    if (!isError) {
      this.updateElement({
        comment: '',
        emotion: '',
        emojiImgTemplate: '',
        error: ''
      });
    } else {
      this.updateElement({
        error: '<p> Can\'t do that right now, sorry! </p>'
      });
      this.#checkForActiveEmoji();
    }
    this.#disableFormDuringPosting(false);
  }

}

