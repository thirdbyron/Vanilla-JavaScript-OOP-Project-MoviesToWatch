import AbstractView from '../../framework/view/abstract-view.js';

const createMoviesListTemplate = () => '<div class="films-list__container"> </div>';

export default class MoviesListView extends AbstractView {

  get template() {
    return createMoviesListTemplate();
  }

}
