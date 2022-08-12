import { render } from '../render.js';

import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';
import MovieDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

import PopupCommentsPresenter from './popup-comments-presenter.js';

export default class PopupPresenter {

  init(mainContainer, movie, comments) {

    const previousPopup = mainContainer.querySelector('.film-details') || null;

    if (previousPopup) {
      previousPopup.remove();
    }

    this.wrapperComponent = new PopupWrapperView;
    this.contentComponent = new PopupContentView;
    this.descriptionWrapperComponent = new MovieDescriptionWrapperView;
    this.controlsComponent = new MovieControlsView;

    this.commentPresenter = new PopupCommentsPresenter;

    render(this.wrapperComponent, mainContainer);
    render(this.contentComponent, this.wrapperComponent.getElement());
    render(this.descriptionWrapperComponent, this.contentComponent.getElement());

    this.descriptionWrapperComponent.getElement().children[0].children[0].addEventListener('click', () => {
      const currentPopup = mainContainer.querySelector('.film-details');
      currentPopup.remove();
    });

    render(new MovieDescriptionView(movie), this.descriptionWrapperComponent.getElement());

    render(this.controlsComponent, this.descriptionWrapperComponent.getElement());

    this.commentPresenter.init(this.descriptionWrapperComponent.getElement(), movie.comments, comments);

  }

}
