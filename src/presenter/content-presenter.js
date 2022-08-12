import { render } from '../render.js';

import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListView from '../view/content/movies-list-view.js';
import MovieCardView from '../view/content/movie-card-view.js';
import ShowMoreButtonView from '../view/content/show-more-button-view.js';

import PopupPresenter from './popup-presenter.js';

import CommentsModel from '../model/comments-model.js';


export default class ContentPresenter {

  #mainContainer = null;
  #movies = null;

  #contentComponent = new ContentView;
  #moviesListWrapperComponent = new MoviesListWrapperView;
  #moviesListComponent = new MoviesListView;
  #showMoreButtonComponent = new ShowMoreButtonView;

  #commentsModel = new CommentsModel;

  #renderMovies(movies) {
    for (let i = 0; i < movies.length; i++) {
      const movieCard = new MovieCardView(movies[i]);

      render(movieCard, this.#moviesListComponent.element);
      this.#addPopup(movieCard, movies[i]);
    }
  }

  #addPopup(movieCard, movieData) {
    movieCard.element.addEventListener('click', () => {
      new PopupPresenter().init(this.#mainContainer, movieData, this.#commentsModel.comments);
    });
  }

  init(mainContainer, moviesModel) {

    this.#mainContainer = mainContainer;

    this.#movies = moviesModel.movies;

    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);
    render(this.#moviesListComponent, this.#moviesListWrapperComponent.element);
    render(this.#showMoreButtonComponent, this.#moviesListWrapperComponent.element);

    this.#renderMovies(this.#movies);

  }

}
