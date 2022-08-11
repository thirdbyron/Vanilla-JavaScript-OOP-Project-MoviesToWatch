import { render } from '../render.js';

import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';
import MovieDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

import PopupCommentsPresenter from './popup-comments-presenter.js';

import CommentsModel from '../model/comments-model.js';

export default class PopupPresenter {

  wrapperComponent = new PopupWrapperView;
  contentComponent = new PopupContentView;
  descriptionWrapperComponent = new MovieDescriptionWrapperView;
  controlsComponent = new MovieControlsView;

  init(mainContainer, movie) {

    this.commentPresenter = new PopupCommentsPresenter;
    this.commentsModel = new CommentsModel;

    render(this.wrapperComponent, mainContainer);
    render(this.contentComponent, this.wrapperComponent.getElement());
    render(this.descriptionWrapperComponent, this.contentComponent.getElement());

    // Тестовое добавление обработчика по клику на крестик попапа для удобства проверки:

    this.descriptionWrapperComponent.getElement().children[0].children[0].addEventListener('click', () => {
      mainContainer.querySelector('.film-details').remove();
    });

    // ---

    render(new MovieDescriptionView(movie), this.descriptionWrapperComponent.getElement());

    render(this.controlsComponent, this.descriptionWrapperComponent.getElement());

    const comments = this.commentsModel.comments;

    this.commentPresenter.init(this.descriptionWrapperComponent.getElement(), movie.comments, comments);

  }

}
