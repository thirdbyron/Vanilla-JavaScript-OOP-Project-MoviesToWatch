import { render } from '../framework/render.js';
import MovieDescriptionView from '../view/popup/movie-description-view.js';
import MoviesDescriptionWrapperView from '../view/popup/movie-description-wrapper-view.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';
import PopupCommentsPresenter from './popup-comments-presenter.js';
import { FILTER_FROM_DATA } from '../const.js';

export default class MovieDescriptionPresenter {

  #mainContainer = null;
  #movie = null;
  #comments = null;
  #descriptionWrapperComponent = null;
  #closeHandler = null;
  #onChangeData = null;
  #controlsComponent = null;

  init(mainContainer, movie, comments, closeHandler, onChangeData) {

    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#comments = comments;
    this.#closeHandler = closeHandler;
    this.#onChangeData = onChangeData;
    this.#controlsComponent = new MovieControlsView;

    this.#renderDescription();

    this.#setHandlers();

    this.#presentPopupComments();

  }

  #presentPopupComments() {
    new PopupCommentsPresenter().init(
      this.#descriptionWrapperComponent.element,
      this.#movie.comments,
      this.#comments
    );
  }

  #setHandlers() {
    this.#descriptionWrapperComponent.setCloseClickHandler(this.#closeHandler);
    this.#controlsComponent.setFavoriteClickHandler(() => {
      this.#onChangeData(this.#movie, FILTER_FROM_DATA.favorites);
      this.#controlsComponent.toggleClass(this.#controlsComponent.favoriteButtonElement);
    });
    this.#controlsComponent.setWatchedClickHandler(() => {
      this.#onChangeData(this.#movie, FILTER_FROM_DATA.watched);
      this.#controlsComponent.toggleClass(this.#controlsComponent.watchedButtonElement);
    });
    this.#controlsComponent.setWatchlistClickHandler(() => {
      this.#onChangeData(this.#movie, FILTER_FROM_DATA.watchlist);
      this.#controlsComponent.toggleClass(this.#controlsComponent.watchlistButtonElement);
    });
  }

  #renderDescription() {
    this.#descriptionWrapperComponent = new MoviesDescriptionWrapperView;

    render(this.#descriptionWrapperComponent, this.#mainContainer);
    render(new MovieDescriptionView(this.#movie), this.#descriptionWrapperComponent.element);
    render(this.#controlsComponent, this.#descriptionWrapperComponent.element);
  }


}
