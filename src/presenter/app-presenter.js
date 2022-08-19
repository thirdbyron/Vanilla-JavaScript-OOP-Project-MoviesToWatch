import { render } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION } from '../const.js';
import ContentPresenter from './content-presenter.js';
import MoviesModel from '../model/movies-model.js';
import FiltersPresenter from './filters-presenter.js';
import ProfileThumbnailView from '../view/profile-thumbnail-view.js';

export default class AppPresenter {

  #siteMainElement = null;
  #siteHeaderElement = null;
  #moviesModel = null;
  #filtersPresenter = null;
  #contentPresenter = null;

  get movies() {
    return this.#moviesModel.movies;
  }

  init() {

    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = document.querySelector('.header');
    this.#moviesModel = new MoviesModel;
    this.#filtersPresenter = new FiltersPresenter;
    this.#contentPresenter = new ContentPresenter;

    this.#moviesModel.addObserver(this.#handleModelEvent);

    this.#renderApp();

  }

  #renderProfile() {
    render(new ProfileThumbnailView, this.#siteHeaderElement);
  }

  #renderApp() {

    this.#renderProfile();

    this.#filtersPresenter.init(
      this.#siteMainElement,
      this.movies,
    );

    this.#contentPresenter.init(
      this.#siteMainElement,
      this.movies,
      this.#handleViewAction
    );
  }

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
        this.#filtersPresenter.updateFilters();
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
