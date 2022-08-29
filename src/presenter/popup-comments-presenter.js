import { render, replace } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION } from '../const.js';
import MovieCommentsWrapperView from '../view/popup/comments/movie-comments-wrapper-view.js';
import MovieCommentsListView from '../view/popup/comments/movie-comments-list-view.js';
import MovieAddCommentFormView from '../view/popup/comments/movie-add-comment-form-view.js';
import MovieCommentView from '../view/popup/comments/movie-comment-view.js';
import TempCommentModel from '../model/temp-comment-model.js';

export default class PopupCommentsPresenter {

  #mainContainer = null;
  #commentsModel = null;
  #onChangeData = null;
  #movie = null;
  #moviesModel = null;
  #commentsWrapperComponent = null;
  #commentsListComponent = null;
  #addCommentFormComponent = null;
  #tempComment = null;

  init(mainContainer, moviesModel, commentsModel, onChangeData, movie) {

    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#onChangeData = onChangeData;
    this.#movie = movie;

    this.#commentsModel.addObserver(this.#handleModelEvent);

    this.#commentsModel.init(UPDATE_TYPE.init, this.#movie.id);

    this.#tempComment = new TempCommentModel().comment;
    this.#addCommentFormComponent = new MovieAddCommentFormView(this.#tempComment);

    this.#addCommentFormComponent.setAddCommentHandler(this.#handleAddComment);
  }

  #renderComments = () => {

    this.#commentsWrapperComponent = new MovieCommentsWrapperView(this.#commentsModel.comments.length);
    this.#commentsListComponent = new MovieCommentsListView;

    render(this.#commentsWrapperComponent, this.#mainContainer);
    render(this.#commentsListComponent, this.#commentsWrapperComponent.element);
    render(this.#addCommentFormComponent, this.#commentsWrapperComponent.element);

    this.#renderCommentsList();

  };

  rerenderCommentsList() {

    this.#commentsWrapperComponent.changeCommentsCounter(this.#commentsModel.comments.length);

    const newCommentsListComponent = new MovieCommentsListView;
    replace(newCommentsListComponent, this.#commentsListComponent);
    this.#commentsListComponent = newCommentsListComponent;

    this.#renderCommentsList();

    this.#movie.comments = this.#commentsModel.comments.map((comment) => comment.id);
    this.#onChangeData(USER_ACTION.updateMovie, UPDATE_TYPE.patch, this.#movie);

  }


  #renderCommentsList() {
    for (let i = 0; i < this.#commentsModel.comments.length; i++) {
      const commentComponent = new MovieCommentView(this.#commentsModel.comments[i]);
      render(commentComponent, this.#commentsListComponent.element);
      commentComponent.setDeleteCommentClickHandler(this.#handleDeleteClick);
    }
  }

  removeAddCommentHandler() {
    this.#addCommentFormComponent.removeAddCommentHandler();
  }

  #handleDeleteClick = (commentToDelete) => {
    this.#handleViewAction(USER_ACTION.deleteComment, UPDATE_TYPE.patch, commentToDelete);
  };

  #handleAddComment = (newComment) => {
    this.#handleViewAction(USER_ACTION.addComment, UPDATE_TYPE.patch, newComment);
  };

  #handleViewAction = (userAction, updateType, update) => {
    switch (userAction) {
      case USER_ACTION.deleteComment:
        this.#commentsModel.deleteComment(updateType, update);
        break;
      case USER_ACTION.addComment:
        this.#commentsModel.addComment(updateType, update, this.#movie);
    }
  };

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UPDATE_TYPE.init:
        this.#renderComments();
        break;
      case UPDATE_TYPE.patch:
        this.rerenderCommentsList();
    }
  };

}
