import { render } from '../render.js';

import MovieCommentsWrapperView from '../view/popup/comments/movie-comments-wrapper-view.js';
import MovieCommentsListView from '../view/popup/comments/movie-comments-list-view.js';
import MovieAddCommentFormView from '../view/popup/comments/movie-add-comment-form-view.js';
import MovieCommentView from '../view/popup/comments/movie-comment-view.js';

export default class PopupCommentsPresenter {

  commentsWrapperComponent = new MovieCommentsWrapperView;
  commentsListComponent = new MovieCommentsListView;
  addCommentFormComponent = new MovieAddCommentFormView;

  init(mainContainer, commentIdNumbers, comments) {
    render(this.commentsWrapperComponent, mainContainer);
    render(this.commentsListComponent, this.commentsWrapperComponent.getElement());
    render(this.addCommentFormComponent, this.commentsWrapperComponent.getElement());

    if (commentIdNumbers[0] !== null) {
      for (let i = 0; i < commentIdNumbers.length; i++) {
        const rightComment = comments.find((comment) => comment.id === commentIdNumbers[i]);
        render(new MovieCommentView(rightComment), this.commentsListComponent.getElement());
      }
    }

    this.commentsWrapperComponent.getElement().querySelector('.film-details__comments-count').textContent = this.commentsListComponent.getElement().children.length;

  }
}
