import { render, replace } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION } from '../const.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

export default class ControlButtonsPresenter {

  #mainContainer = null;
  #movie = null;
  #controlButtonsComponent = null;
  #onChangeData = null;

  init(mainContainer, movie, onChangeData) {
    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#onChangeData = onChangeData;
    this.#controlButtonsComponent = new MovieControlsView(this.#movie);

    render(this.#controlButtonsComponent, this.#mainContainer);

    this.#setHandlers();
  }

  rerender(movie) {
    const newControlButtonsComponent = new MovieControlsView(movie);

    replace(newControlButtonsComponent, this.#controlButtonsComponent);

    this.#controlButtonsComponent = newControlButtonsComponent;

    this.#setHandlers();
  }

  #setHandlers() {
    this.#controlButtonsComponent.setFavoriteClickHandler(() => {
      this.#handleControlButtonClick(this.#controlButtonsComponent.favoriteButtonElement);
    });
    this.#controlButtonsComponent.setWatchedClickHandler(() => {
      this.#handleControlButtonClick(this.#controlButtonsComponent.watchedButtonElement);
    });
    this.#controlButtonsComponent.setWatchlistClickHandler(() => {
      this.#handleControlButtonClick(this.#controlButtonsComponent.watchlistButtonElement);
    });
  }

  #changeMovieUserDetail(type) {
    this.#movie.user_details[type] = !(this.#movie.user_details[type]);
  }

  #handleControlButtonClick(buttonElement) {
    this.#changeMovieUserDetail(this.#controlButtonsComponent.getButtonType(buttonElement));
    this.#onChangeData(USER_ACTION.updateMovie, UPDATE_TYPE.minor, this.#movie);
    this.#controlButtonsComponent.toggleClass(buttonElement);
  }

}
