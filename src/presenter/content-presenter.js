import { render } from '../render.js';

import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListView from '../view/content/movies-list-view.js';
import MovieCardView from '../view/content/movie-card-view.js';
import ShowMoreButtonView from '../view/content/show-more-button-view.js';

import PopupPresenter from './popup-presenter.js';

import CommentsModel from '../model/comments-model.js';


export default class ContentPresenter {

  #movies = null;

  #contentComponent = new ContentView;
  #moviesListWrapperComponent = new MoviesListWrapperView;
  #moviesListComponent = new MoviesListView;
  #showMoreButtonComponent = new ShowMoreButtonView;

  #commentsModel = new CommentsModel;

  init(mainContainer, moviesModel) {

    this.#movies = moviesModel.movies;

    render(this.#contentComponent, mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);
    render(this.#moviesListComponent, this.#moviesListWrapperComponent.element);
    render(this.#showMoreButtonComponent, this.#moviesListWrapperComponent.element);

    for (let i = 0; i < this.#movies.length; i++) {
      render(new MovieCardView(this.#movies[i]), this.#moviesListComponent.element);

      this.#moviesListComponent.element.lastChild.addEventListener('click', () => {
        new PopupPresenter().init(mainContainer.parentNode, this.#movies[i], this.#commentsModel.comments);
      });

    }
  }
}
