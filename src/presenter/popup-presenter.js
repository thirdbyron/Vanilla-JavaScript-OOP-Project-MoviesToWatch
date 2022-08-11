import { render } from '../render.js';

import PopupWrapperView from '../view/popup/popup-wrapper-view.js';
import PopupContentView from '../view/popup/popup-content-view.js';
import MovieDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';
// import MovieCommentsView from '../view/popup/movie-comments-view.js';

export default class PopupPresenter {

  wrapperComponent = new PopupWrapperView;
  contentComponent = new PopupContentView;
  descriptionWrapperComponent = new MovieDescriptionWrapperView;
  controlsComponent = new MovieControlsView;


  init(mainContainer, moviesModel) {
    render(this.wrapperComponent, mainContainer);
    render(this.contentComponent, this.wrapperComponent.getElement());
    render(this.descriptionWrapperComponent, this.contentComponent.getElement());

    // Тестовое добавление обработчика по клику на крестик попапа для удобства проверки:

    this.descriptionWrapperComponent.getElement().children[0].children[0].addEventListener('click', () => {
      mainContainer.querySelector('.film-details').remove();
    });

    // ---

    render(new MovieDescriptionView(moviesModel), this.descriptionWrapperComponent.getElement());

    render(this.controlsComponent, this.descriptionWrapperComponent.getElement());

  }

}
