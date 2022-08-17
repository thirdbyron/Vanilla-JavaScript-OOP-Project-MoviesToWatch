import AbstractView from '../../framework/view/abstract-view.js';

import { EMPTY_MOVIE_LIST_TITLES } from '../../const.js';

const createMoviesListWrapperTemplate = () => `<section class="films-list">
<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2> </section>`;

export default class MoviesListWrapperView extends AbstractView {

  get template() {
    return createMoviesListWrapperTemplate();
  }

  showEmptyListTitle() {
    const emptyListTitleElement = this.element.querySelector('.films-list__title');

    emptyListTitleElement.textContent = EMPTY_MOVIE_LIST_TITLES.allMovies;
    emptyListTitleElement.classList.remove('visually-hidden');
  }

}
