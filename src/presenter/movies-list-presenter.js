import { render } from '../framework/render.js';
import { MOVIES_PER_ROW } from '../const.js';
import MoviesListView from '../view/content/movies-list-view.js';
import MovieCardPresenter from './movie-card-presenter';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';

export default class MoviesListPresenter {

  #mainContainer = null;
  #movies = null;
  #bodyNode = null;
  #onChangeData = null;
  #currentFilter = null;
  #moviesListComponent = null;
  #commentsModel = null;
  #moviesModel = null;
  #movieCardPresenters = new Map();
  #showMoreButtonPresenter = null;


  init(mainContainer, movies, bodyNode, onChangeData, currentFilter, commentsModel, moviesModel) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#bodyNode = bodyNode;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#commentsModel = commentsModel;
    this.#moviesModel = moviesModel;
    this.#moviesListComponent = new MoviesListView;

    this.renderMoviesList();

  }

  renderMoviesList() {
    render(this.#moviesListComponent, this.#mainContainer);

    for (let i = 0; i < Math.min(this.#movies.length, MOVIES_PER_ROW); i++) {

      this.presentMovieCard(this.#movies[i]);

    }

    this.#presentShowMoreButton();
  }

  clearMoviesList() {
    this.#movieCardPresenters.forEach((presenter) => presenter.destroy());
    this.#movieCardPresenters.clear();
    if (this.#showMoreButtonPresenter) {
      this.#showMoreButtonPresenter.destroy();
      this.#showMoreButtonPresenter = null;
    }
  }

  removeMovieCard(movie) {
    this.#movieCardPresenters.get(movie.id).destroy();
  }

  presentMovieForPopup = (movie, isPopupOnly) => {
    this.presentMovieCard(movie, isPopupOnly);
  };

  presentMovieCard = (movie, isPopupOnly = false) => {
    const moviePresenter = new MovieCardPresenter;
    moviePresenter.init(
      this.#moviesListComponent,
      movie,
      isPopupOnly,
      this.#commentsModel,
      this.#bodyNode,
      this.#removePreviousPopup,
      this.#hideOverflow,
      this.#onChangeData,
      this.#currentFilter,
      this.#moviesModel,
    );

    this.#movieCardPresenters.set(movie.id, moviePresenter);
  };

  getMovieCardPresenters = () => this.#movieCardPresenters;

  #presentShowMoreButton() {
    if (this.#movies.length > MOVIES_PER_ROW) {
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter;

      this.#showMoreButtonPresenter.init(
        this.#mainContainer,
        this.#movies,
        this.presentMovieCard
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


}
