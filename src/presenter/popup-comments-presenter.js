import { render, remove } from '../framework/render.js';
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
  #commentComponent = null;
  #addCommentFormComponent = null;
  #tempComment = null;

  init(mainContainer, moviesModel, commentsModel, movie) {

    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#movie = movie;

    this.#commentsModel.addObserver(this.#handleModelEvent);

    this.#renderComments();

    this.#countComments();

  }

  #renderComments() {
    this.#tempComment = new TempCommentModel().comment;

    this.#commentsWrapperComponent = new MovieCommentsWrapperView;
    this.#commentsListComponent = new MovieCommentsListView;
    this.#addCommentFormComponent = new MovieAddCommentFormView(this.#tempComment);

    render(this.#commentsWrapperComponent, this.#mainContainer);
    render(this.#commentsListComponent, this.#commentsWrapperComponent.element);
    render(this.#addCommentFormComponent, this.#commentsWrapperComponent.element);

    this.#renderFilteredComments();
  }

  #renderSingleComment(relevantComment) {
    this.#commentComponent = new MovieCommentView(relevantComment);
    render(this.#commentComponent, this.#commentsListComponent.element);
    this.#commentComponent.setDeleteCommentClickHandler(this.#handleDeleteClick);
  }

  #renderFilteredComments() {
    const commentsVariety = this.#commentsModel.comments;
    const commentIdNumbersPerMovie = this.#movie.comments;

    if (commentIdNumbersPerMovie.length > 0) {
      for (let i = 0; i < commentIdNumbersPerMovie.length; i++) {
        const relevantComment = commentsVariety.find((comment) => comment.id === commentIdNumbersPerMovie[i]);
        this.#renderSingleComment(relevantComment);
      }
    }


  }

  #countComments() {
    this.#commentsWrapperComponent.element.querySelector('.film-details__comments-count').textContent = this.#commentsListComponent.element.children.length;
  }

  #handleDeleteClick = (commentToDelete) => {
    this.#movie = {
      ...this.#movie, comments: this.#movie.comments.filter((commentId) =>
        commentId !== commentToDelete.id
      )
    };
    this.#moviesModel.updateMovie(UPDATE_TYPE.minor, this.#movie);
    this.#commentsModel.deleteComment(commentToDelete);
  };

  #handleModelEvent = () => {
    remove(this.#commentsWrapperComponent);
    this.#renderComments();
  };


}
