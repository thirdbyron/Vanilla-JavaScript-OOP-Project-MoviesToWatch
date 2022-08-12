import { render } from '../render.js';

import MovieCommentsWrapperView from '../view/popup/comments/movie-comments-wrapper-view.js';
import MovieCommentsListView from '../view/popup/comments/movie-comments-list-view.js';
import MovieAddCommentFormView from '../view/popup/comments/movie-add-comment-form-view.js';
import MovieCommentView from '../view/popup/comments/movie-comment-view.js';

export default class PopupCommentsPresenter {

  #commentsWrapperComponent = new MovieCommentsWrapperView;
  #commentsListComponent = new MovieCommentsListView;
  #addCommentFormComponent = new MovieAddCommentFormView;

  #renderFilteredComments(commentsIdNumbers, commentsVariety) {
    if (commentsIdNumbers.length > 0) {

      for (let i = 0; i < commentsIdNumbers.length; i++) {

        const relevantComment = commentsVariety.find((comment) => comment.id === commentsIdNumbers[i]);

        render(new MovieCommentView(relevantComment), this.#commentsListComponent.element);

      }
    }
  }

  #countComments() {
    this.#commentsWrapperComponent.element.querySelector('.film-details__comments-count').textContent = this.#commentsListComponent.element.children.length;
  }

  init(mainContainer, commentsIdNumbers, commentsVariety) {

    render(this.#commentsWrapperComponent, mainContainer);
    render(this.#commentsListComponent, this.#commentsWrapperComponent.element);
    render(this.#addCommentFormComponent, this.#commentsWrapperComponent.element);

    this.#renderFilteredComments(commentsIdNumbers, commentsVariety);

    this.#countComments();

  }
}
