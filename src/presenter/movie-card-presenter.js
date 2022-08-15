import { render } from '../framework/render.js';

import PopupPresenter from './popup-presenter.js';
import MovieCardView from '../view/content/movie-card-view.js';


export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #comments = null;
  #bodyNode = null;

  #movieCardComponent = new MovieCardView(this.#movie);

  init(moviesListComponent, movie, commentsModel, bodyNode) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = movie;
    this.#comments = commentsModel.comments;
    this.#bodyNode = bodyNode;

    this.#movieCardComponent = new MovieCardView(this.#movie);

    this.#renderMovie();
  }

  #renderMovie = () => {
    render(this.#movieCardComponent, this.#moviesListComponent.element);

    this.#addPopup(this.#movieCardComponent);
  };

  #addPopup () {
    this.#movieCardComponent.setPopupClickHandler(() => {
      this.#handlePopupOpenClick(this.#movie);
    });
  }

  #handlePopupOpenClick = (movie) => {
    new PopupPresenter().init(this.#bodyNode, movie, [...this.#comments]);
  };
}
