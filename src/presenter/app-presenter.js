import { render } from '../framework/render.js';
import ProfileThumbnailView from '../view/profile-thumbnail-view.js';
import FiltersView from '../view/filters-view.js';
import SortingBarView from '../view/sorting-bar-view.js';
import ContentPresenter from './content-presenter.js';
import MoviesModel from '../model/movies-model.js';
import { generateFiltersFish } from '../mock/generate-filters-fish.js';

export default class AppPresenter {

  #siteMainElement = null;
  #siteHeaderElement = null;
  #moviesModel = null;

  init() {
    this.#renderApp();
  }

  #renderProfile() {
    render(new ProfileThumbnailView, this.#siteHeaderElement);
  }

  #renderSortBar() {
    render(new SortingBarView, this.#siteMainElement);
  }

  #renderFilters() {
    const filters = generateFiltersFish(this.#moviesModel.movies);
    render(new FiltersView(filters), this.#siteMainElement);
  }

  #renderApp() {
    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = document.querySelector('.header');
    this.#moviesModel = new MoviesModel;

    this.#renderProfile();
    this.#renderFilters();
    this.#renderSortBar();

    new ContentPresenter().init(this.#siteMainElement, this.#moviesModel);
  }

}
