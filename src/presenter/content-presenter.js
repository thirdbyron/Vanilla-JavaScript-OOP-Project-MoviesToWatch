import { render } from '../render.js';

import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListView from '../view/content/movies-list-view.js';
import MovieCardView from '../view/content/movie-card-view.js';

import PopupPresenter from './popup-presenter.js';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';

import CommentsModel from '../model/comments-model.js';

import { EMPTY_MOVIE_LIST_TITLES, MOVIES_PER_ROW } from '../const.js';


export default class ContentPresenter {

  #mainContainer = null;
  #movies = null;

  #contentComponent = new ContentView;
  #moviesListWrapperComponent = new MoviesListWrapperView;
  #moviesListComponent = new MoviesListView;

  #commentsModel = new CommentsModel;

  init(mainContainer, moviesModel) {

    this.#mainContainer = mainContainer;

    this.#movies = [...moviesModel.movies];

    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);

    if (this.#movies.length === 0) {

      this.#showEmptyListTitle();

    } else {

      render(this.#moviesListComponent, this.#moviesListWrapperComponent.element);

      for (let i = 0; i < Math.min(this.#movies.length, MOVIES_PER_ROW); i++) {
        this.#renderMovie(this.#movies[i]);
      }

      if (this.#movies.length > MOVIES_PER_ROW) {
        new ShowMoreButtonPresenter().init(this.#moviesListWrapperComponent.element, this.#movies, this.#renderMovie);
      }

    }
  }

  #renderMovie = (movie) => {
    const movieCard = new MovieCardView(movie);

    render(movieCard, this.#moviesListComponent.element);
    this.#addPopup(movieCard, movie);
  };

  #addPopup(movieCard, movieData) {
    movieCard.element.addEventListener('click', () => {
      new PopupPresenter().init(this.#mainContainer.parentNode, movieData, [...this.#commentsModel.comments]);
    });
  }

  #showEmptyListTitle() {
    const emptyListTitleElement = this.#moviesListWrapperComponent.element.querySelector('.films-list__title');

    emptyListTitleElement.textContent = EMPTY_MOVIE_LIST_TITLES.allMovies;
    emptyListTitleElement.classList.remove('visually-hidden');
  }

}
