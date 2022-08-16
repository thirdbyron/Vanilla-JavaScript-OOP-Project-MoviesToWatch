import { render } from '../framework/render.js';
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
    this.#controlButtonsComponent = new MovieControlsView;

    render(this.#controlButtonsComponent, this.#mainContainer);

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

  #handleControlButtonClick(buttonElement) {
    this.#onChangeData(this.#movie, this.#controlButtonsComponent.getButtonType(buttonElement));
    this.#controlButtonsComponent.toggleClass(buttonElement);
  }
}
