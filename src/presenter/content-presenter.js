import { render } from '../render.js';

import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListView from '../view/content/movies-list-view.js';
import MovieCardView from '../view/content/movie-card-view.js';
import ShowMoreButtonView from '../view/content/show-more-button-view.js';

import PopupPresenter from './popup-presenter.js';


export default class ContentPresenter {
  contentComponent = new ContentView;
  moviesListWrapperComponent = new MoviesListWrapperView;
  moviesListComponent = new MoviesListView;
  showMoreButtonComponent = new ShowMoreButtonView;

  init(mainContainer, moviesModel) {

    this.movies = moviesModel.movies;

    render(this.contentComponent, mainContainer);
    render(this.moviesListWrapperComponent, this.contentComponent.getElement());
    render(this.moviesListComponent, this.moviesListWrapperComponent.getElement());
    render(this.showMoreButtonComponent, this.moviesListWrapperComponent.getElement());

    for (let i = 0; i < this.movies.length; i++) {
      render(new MovieCardView(this.movies[i]), this.moviesListComponent.getElement());

      // Тестовое добавление обработчика по клику на попап для удобства проверки:

      const popupPresenter = new PopupPresenter();

      this.moviesListComponent.getElement().lastChild.addEventListener('click', () => {
        popupPresenter.init(mainContainer.parentNode, this.movies[i]);
      });

      // ---

    }
  }
}
