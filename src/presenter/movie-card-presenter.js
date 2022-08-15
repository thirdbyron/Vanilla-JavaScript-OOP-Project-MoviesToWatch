import { render } from '../framework/render.js';

import PopupPresenter from './popup-presenter.js';
import MovieCardView from '../view/content/movie-card-view.js';


export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #comments = null;
  #bodyNode = null;

  #removePreviosPopup = null;
  #hideOverflow = null;

  #movieCardComponent = null;

  init(moviesListComponent, movie, commentsModel, bodyNode, onRemovePreviosPopup, onHideOverflow) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = movie;
    this.#comments = commentsModel.comments;
    this.#bodyNode = bodyNode;

    this.#removePreviosPopup = onRemovePreviosPopup;
    this.#hideOverflow = onHideOverflow;

    this.#movieCardComponent = new MovieCardView(this.#movie);

    render(this.#movieCardComponent, this.#moviesListComponent.element);

    this.#movieCardComponent.setPopupClickHandler(() => {
      this.#removePreviosPopup();
      this.#hideOverflow();
      new PopupPresenter().init(this.#bodyNode, this.#movie, [...this.#comments]);
    });
  }

}
