import { render } from '../framework/render.js';

import MoviesListView from '../view/content/movies-list-view.js';

import ShowMoreButtonPresenter from './show-more-button-presenter.js';

import CommentsModel from '../model/comments-model.js';

import { MOVIES_PER_ROW } from '../const.js';
import MovieCardPresenter from './movie-card-presenter';

export default class MoviesListPresenter {

  #moviesListWrapperComponent = null;
  #movies = null;
  #bodyNode = null;

  #moviesListComponent = new MoviesListView;

  #commentsModel = new CommentsModel;

  init(moviesListWrapperComponent, movies, bodyNode) {

    this.#moviesListWrapperComponent = moviesListWrapperComponent;
    this.#movies = movies;
    this.#bodyNode = bodyNode;

    this.#renderMoviesList();

    this.#renderShowMoreButton();

  }

  #renderMoviesList() {
    render(this.#moviesListComponent, this.#moviesListWrapperComponent.element);

    for (let i = 0; i < Math.min(this.#movies.length, MOVIES_PER_ROW); i++) {
      this.#renderMovie(this.#movies[i]);
    }
  }

  #renderMovie = (movie) => {
    new MovieCardPresenter().init(this.#moviesListComponent, movie, this.#commentsModel, this.#bodyNode, this.#removePreviousPopup, this.#hideOverflow);
  };

  #renderShowMoreButton() {
    if (this.#movies.length > MOVIES_PER_ROW) {
      new ShowMoreButtonPresenter().init(this.#moviesListWrapperComponent.element, this.#movies, this.#renderMovie);
    }
  }

  #removePreviousPopup = () => {
    if (this.#bodyNode.querySelector('.film-details')) {
      this.#bodyNode.querySelector('.film-details').remove();
    }
  };

  #hideOverflow = () => {
    if (!(this.#bodyNode.classList.contains('hide-overflow'))) {
      this.#bodyNode.classList.add('hide-overflow');
    }
  };

}
