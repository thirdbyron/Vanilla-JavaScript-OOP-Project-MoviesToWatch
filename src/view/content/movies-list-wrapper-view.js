import AbstractView from '../../framework/view/abstract-view.js';

import { EMPTY_MOVIE_LIST_TITLES } from '../../const.js';

const createMoviesListWrapperTemplate = (filterType) => `<section class="films-list">
<h2 class="films-list__title visually-hidden">${EMPTY_MOVIE_LIST_TITLES[filterType]}</h2> </section>`;

export default class MoviesListWrapperView extends AbstractView {

  #filterType = null;

  constructor(filterType) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createMoviesListWrapperTemplate(this.#filterType);
  }

  showEmptyListTitle() {
    const emptyListTitleElement = this.element.querySelector('.films-list__title');

    emptyListTitleElement.classList.remove('visually-hidden');
  }

}
