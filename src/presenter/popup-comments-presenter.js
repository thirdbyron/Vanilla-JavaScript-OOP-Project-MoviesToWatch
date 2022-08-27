import { render, replace } from '../framework/render.js';
import { UPDATE_TYPE } from '../const.js';
import MovieCommentsWrapperView from '../view/popup/comments/movie-comments-wrapper-view.js';
import MovieCommentsListView from '../view/popup/comments/movie-comments-list-view.js';
import MovieAddCommentFormView from '../view/popup/comments/movie-add-comment-form-view.js';
import MovieCommentView from '../view/popup/comments/movie-comment-view.js';
import TempCommentModel from '../model/temp-comment-model.js';

export default class PopupCommentsPresenter {

  #mainContainer = null;
  #moviesModel = null;
  #commentsModel = null;
  #movie = null;
  #commentsWrapperComponent = null;
  #commentsListComponent = null;
  #addCommentFormComponent = null;
  #tempComment = null;

  init(mainContainer, moviesModel, commentsModel, movie) {

    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#movie = movie;

    this.#commentsModel.addObserver(this.#renderComments);

    this.#commentsModel.init(this.#movie.id);

    this.#tempComment = new TempCommentModel().comment;
    this.#addCommentFormComponent = new MovieAddCommentFormView(this.#tempComment);

    this.#addCommentFormComponent.setAddCommentHandler(this.#handleAddComment);

  }

  #renderComments = () => {

    this.#commentsWrapperComponent = new MovieCommentsWrapperView(this.#movie);
    this.#commentsListComponent = new MovieCommentsListView;

    render(this.#commentsWrapperComponent, this.#mainContainer);
    render(this.#commentsListComponent, this.#commentsWrapperComponent.element);
    render(this.#addCommentFormComponent, this.#commentsWrapperComponent.element);

    this.#renderCommentsList();
    
  };

  rerenderCommentsList(movie) {

    this.#movie = movie;

    this.#commentsWrapperComponent.changeCommentsCounter(this.#movie);

    const newCommentsListComponent = new MovieCommentsListView;
    replace(newCommentsListComponent, this.#commentsListComponent);
    this.#commentsListComponent = newCommentsListComponent;

    this.#renderCommentsList();

  }

  #renderCommentsList() {
    for (let i = 0; i < this.#commentsModel.comments.length; i++) {
      const commentComponent = new MovieCommentView(this.#commentsModel.comments[i]);
      render(commentComponent, this.#commentsListComponent.element);
      commentComponent.setDeleteCommentClickHandler(this.#handleDeleteClick);
    }
  }

  #handleDeleteClick = (commentToDelete) => {
    this.#movie.comments = this.#movie.comments.filter((commentId) =>
      commentId !== commentToDelete.id
    );
    this.#commentsModel.deleteComment(commentToDelete);
    this.#moviesModel.updateMovie(UPDATE_TYPE.patch, this.#movie);
  };

  #handleAddComment = (newComment) => {
    const commentNewId = nanoid(3);
    this.#movie.comments.push(commentNewId);
    this.#commentsModel.addComment({ id: commentNewId, movieId: this.#movie.id, ...newComment });
    this.#moviesModel.updateMovie(UPDATE_TYPE.patch, this.#movie);
  };

  removeAddCommentHandler() {
    this.#addCommentFormComponent.removeAddCommentHandler();
  }

}
