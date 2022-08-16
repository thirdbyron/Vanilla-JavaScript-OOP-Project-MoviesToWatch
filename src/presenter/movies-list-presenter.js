import { render } from '../framework/render.js';
import MoviesListView from '../view/content/movies-list-view.js';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';
import CommentsModel from '../model/comments-model.js';
import { MOVIES_PER_ROW } from '../const.js';
import MovieCardPresenter from './movie-card-presenter';

export default class MoviesListPresenter {

  #mainContainer = null;
  #movies = null;
  #bodyNode = null;
  #moviesListComponent = null;
  #commentsModel = null;

  init(mainContainer, movies, bodyNode) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#bodyNode = bodyNode;
    this.#moviesListComponent = new MoviesListView;
    this.#commentsModel = new CommentsModel;

    this.#renderMoviesList();

    this.#presentShowMoreButton();

  }

  #renderMoviesList() {
    render(this.#moviesListComponent, this.#mainContainer);

    for (let i = 0; i < Math.min(this.#movies.length, MOVIES_PER_ROW); i++) {
      this.#presentMovieCard(this.#movies[i]);
    }
  }

  #presentMovieCard = (movie) => {
    new MovieCardPresenter().init(
      this.#moviesListComponent,
      movie,
      this.#commentsModel,
      this.#bodyNode,
      this.#removePreviousPopup,
      this.#hideOverflow
    );
  };

  #presentShowMoreButton() {
    if (this.#movies.length > MOVIES_PER_ROW) {
      new ShowMoreButtonPresenter().init(
        this.#mainContainer,
        this.#movies,
        this.#presentMovieCard
      );
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
