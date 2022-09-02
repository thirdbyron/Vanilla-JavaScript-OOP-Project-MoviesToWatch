import { END_POINT, AUTHORIZATION } from '../const.js';
import ContentPresenter from './content-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import FiltersModel from '../model/filters-model.js';
import MoviesModel from '../model/movies-model.js';
import MoviesApiService from '../movies-api-service.js';
import ProfileThumbnailPresenter from './profile-thumbnail-presenter.js';

export default class AppPresenter {

  #siteMainElement = null;
  #siteHeaderElement = null;
  #moviesModel = null;
  #profileThumbnailPresenter = null;
  #filtersModel = null;
  #filtersPresenter = null;
  #contentPresenter = null;

  init() {
    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = document.querySelector('.header');

    this.#moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTHORIZATION));

    this.#moviesModel.init();

    this.#filtersModel = new FiltersModel;

    this.#profileThumbnailPresenter = new ProfileThumbnailPresenter;
    this.#filtersPresenter = new FiltersPresenter;
    this.#contentPresenter = new ContentPresenter;

    this.#renderApp();
  }

  #renderApp() {
    this.#profileThumbnailPresenter.init(
      this.#siteHeaderElement,
      this.#moviesModel,
    );

    this.#filtersPresenter.init(
      this.#siteMainElement,
      this.#moviesModel,
      this.#filtersModel,
    );

    this.#contentPresenter.init(
      this.#siteMainElement,
      this.#moviesModel,
      this.#filtersModel,
    );
  }

}
