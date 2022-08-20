import { render } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION, SORT_TYPE } from '../const.js';
import { sortMovieByDate, sortMovieByRating } from '../utils/movie-data.js';
import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import MoviesListPresenter from './movies-list-presenter.js';
import SortingBarPresenter from './sorting-bar-presenter.js';

export default class ContentPresenter {

  #mainContainer = null;
  #moviesModel = null;
  #filtersModel = null;
  #contentComponent = null;
  #moviesListWrapperComponent = null;
  #onChangeData = null;
  #moviesListPresenter = null;
  #sortingBarPresenter = null;
  #currentSortType = null;

  get movies() {
    switch (this.#currentSortType) {
      case SORT_TYPE.date:
        return [...this.#moviesModel.movies.sort(sortMovieByDate)];
      case SORT_TYPE.rating:
        return [...this.#moviesModel.movies.sort(sortMovieByRating)];
    }
    return this.#moviesModel.movies;
  }

  init(mainContainer, moviesModel, filtersModel) {

    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#filtersModel = filtersModel;
    this.#currentSortType = SORT_TYPE.default;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

    this.#checkForMovies();

  }

  #renderContent() {

    this.#sortingBarPresenter = new SortingBarPresenter;
    this.#moviesListPresenter = new MoviesListPresenter;
    this.#contentComponent = new ContentView;
    this.#moviesListWrapperComponent = new MoviesListWrapperView;

    this.#sortingBarPresenter.init(
      this.#mainContainer,
      this.movies,
      this.#handleClearMovies,
      this.#handleRenderMovies
    );

    render(this.#contentComponent, this.#mainContainer);
    render(this.#moviesListWrapperComponent, this.#contentComponent.element);

    this.#moviesListPresenter.init(
      this.#moviesListWrapperComponent.element,
      this.movies,
      this.#mainContainer.parentNode,
      this.#onChangeData,
    );

  }

  #checkForMovies() {
    if (this.movies.length === 0) {
      this.#moviesListWrapperComponent.showEmptyListTitle();
    } else {
      this.#renderContent();
    }
  }

  #handleClearMovies = () => {
    this.#moviesListPresenter.clearMoviesList();
  };

  #handleRenderMovies = () => {
    this.#moviesListPresenter.renderMoviesList(this.movies);
  };

  #handleViewAction = (actionType, updateType, updatedMovie) => {
    switch (actionType) {
      case USER_ACTION.updateMovie:
        this.#moviesModel.updateMovie(updateType, updatedMovie);
        break;
    }
  };

  #handleModelEvent = (updateType, updatedMovie) => {
    switch (updateType) {
      case UPDATE_TYPE.patch:

        break;
      case UPDATE_TYPE.minor:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UPDATE_TYPE.major:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

}
