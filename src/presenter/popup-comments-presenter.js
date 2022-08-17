import { render } from '../framework/render.js';
import MovieCommentsWrapperView from '../view/popup/comments/movie-comments-wrapper-view.js';
import MovieCommentsListView from '../view/popup/comments/movie-comments-list-view.js';
import MovieAddCommentFormView from '../view/popup/comments/movie-add-comment-form-view.js';
import MovieCommentView from '../view/popup/comments/movie-comment-view.js';

export default class PopupCommentsPresenter {

  #mainContainer = null;
  #commentsIdNumbers = null;
  #commentsVariety = null;
  #commentsWrapperComponent = null;
  #commentsListComponent = null;
  #addCommentFormComponent = null;

  init(mainContainer, commentsIdNumbers, commentsVariety) {

    this.#mainContainer = mainContainer;
    this.#commentsIdNumbers = commentsIdNumbers;
    this.#commentsVariety = commentsVariety;

    this.#renderComments();

    this.#countComments();

  }

  #renderComments() {
    this.#commentsWrapperComponent = new MovieCommentsWrapperView;
    this.#commentsListComponent = new MovieCommentsListView;
    this.#addCommentFormComponent = new MovieAddCommentFormView;

    render(this.#commentsWrapperComponent, this.#mainContainer);
    render(this.#commentsListComponent, this.#commentsWrapperComponent.element);
    render(this.#addCommentFormComponent, this.#commentsWrapperComponent.element);

    this.#renderFilteredComments();
  }

  #renderSingleComment(relevantComment) {
    render(new MovieCommentView(relevantComment), this.#commentsListComponent.element);
  }

  #renderFilteredComments() {
    if (this.#commentsIdNumbers.length > 0) {
      for (let i = 0; i < this.#commentsIdNumbers.length; i++) {
        const relevantComment = this.#commentsVariety.find((comment) => comment.id === this.#commentsIdNumbers[i]);
        this.#renderSingleComment(relevantComment);
      }
    }
  }

  #countComments() {
    this.#commentsWrapperComponent.element.querySelector('.film-details__comments-count').textContent = this.#commentsListComponent.element.children.length;
  }

}
