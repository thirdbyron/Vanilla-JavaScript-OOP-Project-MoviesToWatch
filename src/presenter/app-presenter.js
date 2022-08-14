import { render } from '../framework/render.js';

import ProfileThumbnailView from '../view/profile-thumbnail-view.js';
import NavigationBarView from '../view/navigation-bar-view.js';
import SortingBarView from '../view/sorting-bar-view.js';
import ContentPresenter from './content-presenter.js';
import MoviesModel from '../model/movies-model.js';


export default class AppPresenter {

  #siteMainElement = document.querySelector('.main');
  #siteHeaderElement = document.querySelector('.header');

  #contentPresenter = new ContentPresenter;

  #moviesModel = new MoviesModel;

  init() {

    render(new ProfileThumbnailView, this.#siteHeaderElement);
    render(new NavigationBarView, this.#siteMainElement);
    render(new SortingBarView, this.#siteMainElement);

    this.#contentPresenter.init(this.#siteMainElement, this.#moviesModel);

  }

}
