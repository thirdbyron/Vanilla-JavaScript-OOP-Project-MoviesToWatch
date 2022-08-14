import AbstractView from '../../../framework/view/abstract-view.js';
const createMovieCommentsListTemplate = () => '<ul class="film-details__comments-list"> </ul>';

export default class MovieCommentsListView extends AbstractView {

  get template() {
    return createMovieCommentsListTemplate();
  }

}

