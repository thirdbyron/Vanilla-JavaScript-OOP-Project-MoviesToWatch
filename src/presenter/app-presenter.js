import { render } from '../framework/render.js';
import { END_POINT, AUTHORIZATION } from '../const.js';
import ContentPresenter from './content-presenter.js';
import MoviesModel from '../model/movies-model.js';
import MoviesApiService from '../movies-api-service.js';
import FiltersPresenter from './filters-presenter.js';
import FiltersModel from '../model/filters-model.js';
import ProfileThumbnailView from '../view/profile-thumbnail-view.js';

export default class AppPresenter {

  #siteMainElement = null;
  #siteHeaderElement = null;
  #moviesModel = null;
  #filtersModel = null;
  #filtersPresenter = null;
  #contentPresenter = null;

  init() {

    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = document.querySelector('.header');
    this.#moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTHORIZATION));
    this.#filtersModel = new FiltersModel;
    this.#filtersPresenter = new FiltersPresenter;
    this.#contentPresenter = new ContentPresenter;

    this.#renderApp();

  }

  #renderProfile() {
    render(new ProfileThumbnailView, this.#siteHeaderElement);
  }

  #renderApp() {

    this.#renderProfile();

    this.#filtersPresenter.init(
      this.#siteMainElement,
      this.#moviesModel,
      this.#filtersModel
    );

    this.#contentPresenter.init(
      this.#siteMainElement,
      this.#moviesModel,
      this.#filtersModel,
    );

  }

}
