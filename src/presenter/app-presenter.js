import { render } from '../framework/render.js';

import ProfileThumbnailView from '../view/profile-thumbnail-view.js';
import FiltersView from '../view/filters-view.js';
import SortingBarView from '../view/sorting-bar-view.js';
import ContentPresenter from './content-presenter.js';
import MoviesModel from '../model/movies-model.js';

import { generateFiltersFish } from '../mock/generate-filters-fish.js';


export default class AppPresenter {

  #siteMainElement = document.querySelector('.main');
  #siteHeaderElement = document.querySelector('.header');

  #moviesModel = new MoviesModel;

  init() {

    this.#renderProfileThumbnail();

    this.#renderFilters();

    this.#renderSortingBar();

    this.#renderContent();

  }

  #renderContent() {
    const contentPresenter = new ContentPresenter;
    contentPresenter.init(this.#siteMainElement, this.#moviesModel);
  }

  #renderFilters() {
    const filters = generateFiltersFish(this.#moviesModel.movies);
    render(new FiltersView(filters), this.#siteMainElement);
  }

  #renderSortingBar() {
    render(new SortingBarView, this.#siteMainElement);
  }

  #renderProfileThumbnail() {
    render(new ProfileThumbnailView, this.#siteHeaderElement);
  }

}
