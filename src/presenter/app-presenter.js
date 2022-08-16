import { render } from '../framework/render.js';
import ProfileThumbnailView from '../view/profile-thumbnail-view.js';
import SortingBarView from '../view/sorting-bar-view.js';
import ContentPresenter from './content-presenter.js';
import MoviesModel from '../model/movies-model.js';
import FiltersPresenter from './filters-presenter.js';

export default class AppPresenter {

  #siteMainElement = null;
  #siteHeaderElement = null;
  #moviesModel = null;
  #filtersPresenter = null;

  init() {

    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = document.querySelector('.header');
    this.#moviesModel = new MoviesModel;
    this.#filtersPresenter = new FiltersPresenter;

    this.#renderApp();

  }

  #renderProfile() {
    render(new ProfileThumbnailView, this.#siteHeaderElement);
  }

  #renderSortBar() {
    render(new SortingBarView, this.#siteMainElement);
  }

  #renderApp() {

    this.#filtersPresenter.init(this.#siteMainElement, this.#moviesModel.movies);
    this.#renderProfile();
    this.#renderSortBar();

    new ContentPresenter().init(this.#siteMainElement, this.#moviesModel.movies, this.#filtersPresenter.updateFilters);
  }

}
