import { render } from '../framework/render.js';
import { MOVIES_PER_ROW } from '../const.js';
import { updateItem } from '../utils/common.js';
import CommentsModel from '../model/comments-model.js';
import MoviesListView from '../view/content/movies-list-view.js';
import MovieCardPresenter from './movie-card-presenter';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';

export default class MoviesListPresenter {

  #mainContainer = null;
  #movies = null;
  #bodyNode = null;
  #onUpdateFilters = null;
  #onGetActualMovies = null;
  #moviesListComponent = null;
  #commentsModel = null;
  #movieCardPresenters = new Map();
  #showMoreButtonPresenter = null;


  init(mainContainer, movies, bodyNode, onUpdateFilters, onGetActualMovies) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#bodyNode = bodyNode;
    this.#onUpdateFilters = onUpdateFilters;
    this.#onGetActualMovies = onGetActualMovies;
    this.#moviesListComponent = new MoviesListView;
    this.#commentsModel = new CommentsModel;

    this.renderMoviesList();

  }

  renderMoviesList() {
    render(this.#moviesListComponent, this.#mainContainer);
    for (let i = 0; i < Math.min(this.#movies.length, MOVIES_PER_ROW); i++) {
      this.#presentMovieCard(this.#movies[i]);
    }
    this.#presentShowMoreButton();
  }

  clearMoviesList() {
    this.#movieCardPresenters.forEach((presenter) => presenter.destroy());
    this.#movieCardPresenters.clear();
    this.#showMoreButtonPresenter.destroy();
    this.#showMoreButtonPresenter = null;
  }

  getActualMovies(actualMovies) {
    this.#movies = actualMovies;
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
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter;

      this.#showMoreButtonPresenter.init(
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

  #handleChangeData = (movie) => {
    this.#movies = updateItem(this.#movies, movie);
    this.#onGetActualMovies(this.#movies);
    this.#onUpdateFilters();
  };

}
