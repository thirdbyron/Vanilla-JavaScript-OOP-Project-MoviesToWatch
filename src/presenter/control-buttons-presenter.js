import { render, replace } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION } from '../const.js';
import { checkForMinorUpdate } from '../utils/filters.js';
import MovieControlsView from '../view/popup/movie-controls-view.js';

export default class ControlButtonsPresenter {

  #mainContainer = null;
  #movie = null;
  #controlButtonsComponent = null;
  #onChangeData = null;
  #currentFilter = null;

  init(mainContainer, movie, onChangeData, currentFilter) {
    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#controlButtonsComponent = new MovieControlsView(this.#movie);

    render(this.#controlButtonsComponent, this.#mainContainer);

    this.#setHandlers();
  }

  rerenderControllButtons(movie) {
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
    this.#movie.userDetails[type] = !(this.#movie.userDetails[type]);
  }

  #handleControlButtonClick(buttonElement) {
    const filterType = this.#controlButtonsComponent.getButtonType(buttonElement);

    const isMinorUpdate = checkForMinorUpdate(this.#currentFilter, filterType);

    this.#changeMovieUserDetail(filterType);

    this.#onChangeData(USER_ACTION.updateMovie, isMinorUpdate ? UPDATE_TYPE.minor : UPDATE_TYPE.patch, this.#movie);
  }

}
