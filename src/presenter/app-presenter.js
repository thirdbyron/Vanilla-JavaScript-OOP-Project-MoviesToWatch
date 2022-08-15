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

  #contentPresenter = new ContentPresenter;

  #moviesModel = new MoviesModel;

  init() {

    const filters = generateFiltersFish(this.#moviesModel.movies);

    render(new ProfileThumbnailView, this.#siteHeaderElement);
    render(new FiltersView(filters), this.#siteMainElement);
    render(new SortingBarView, this.#siteMainElement);

    this.#contentPresenter.init(this.#siteMainElement, this.#moviesModel);

  }

}
