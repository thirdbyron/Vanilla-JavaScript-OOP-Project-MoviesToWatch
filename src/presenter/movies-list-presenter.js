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
  #onUpdateFilters = null;
  #moviesListComponent = null;
  #commentsModel = null;
  #movieCardPresenters = new Map();

  init(mainContainer, movies, bodyNode, onUpdateFilters) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#bodyNode = bodyNode;
    this.#onUpdateFilters = onUpdateFilters;
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
    const moviePresenter = new MovieCardPresenter;
    moviePresenter.init(
      this.#moviesListComponent,
      movie,
      this.#commentsModel,
      this.#bodyNode,
      this.#removePreviousPopup,
      this.#hideOverflow,
      this.#handleChangeData
    );

    this.#movieCardPresenters.set(movie.id, moviePresenter);
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
    const previousPopup = Array.from(this.#movieCardPresenters.values()).find((presenter) => presenter.isPopupOpen);
    if (previousPopup) {
      previousPopup.clearPreviousPopup();
    }
  };

  #hideOverflow = () => {
    if (!(document.querySelector('body').classList.contains('hide-overflow'))) {
      document.querySelector('body').classList.add('hide-overflow');
    }
  };

  #handleChangeData = (movie, type) => {
    movie.user_details[type] = !(movie.user_details[type]);
    this.#onUpdateFilters();
  };

}
