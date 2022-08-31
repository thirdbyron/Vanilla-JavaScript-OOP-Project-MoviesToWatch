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
  #onDisableMovieCardControlButtons = null;

  get movie() {
    return this.#movie;
  }

  set movie(value) {
    this.#movie = value;
  }

  init(mainContainer, movie, onChangeData, currentFilter, onDisableMovieCardControlButtons) {
    this.#mainContainer = mainContainer;
    this.#movie = movie;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;
    this.#onDisableMovieCardControlButtons = onDisableMovieCardControlButtons;

    this.#controlButtonsComponent = new MovieControlsView(this.#movie);

    render(this.#controlButtonsComponent, this.#mainContainer);

    this.#setHandlers();
  }

  rerenderControllButtons() {
    const newControlButtonsComponent = new MovieControlsView(this.#movie);
    replace(newControlButtonsComponent, this.#controlButtonsComponent);

    this.#controlButtonsComponent = newControlButtonsComponent;

    this.#setHandlers();
  }

  disableControlButtons = (isDisabled) => {
    this.#controlButtonsComponent.disableControlButtons(isDisabled);
  };

  shakeElementWhileError() {
    this.#controlButtonsComponent.shake(this.#handleActivationControlButtons);
  }

  #setHandlers() {
    this.#controlButtonsComponent.setFavoriteClickHandler(() => {
      this.disableControlButtons(true);
      this.#onDisableMovieCardControlButtons(true);
      this.#handleControlButtonClick(this.#controlButtonsComponent.favoriteButtonElement);
    });
    this.#controlButtonsComponent.setWatchedClickHandler(() => {
      this.disableControlButtons(true);
      this.#onDisableMovieCardControlButtons(true);
      this.#handleControlButtonClick(this.#controlButtonsComponent.watchedButtonElement);
    });
    this.#controlButtonsComponent.setWatchlistClickHandler(() => {
      this.disableControlButtons(true);
      this.#onDisableMovieCardControlButtons(true);
      this.#handleControlButtonClick(this.#controlButtonsComponent.watchlistButtonElement);
    });
  }

  #handleControlButtonClick(buttonElement) {
    const filterType = this.#controlButtonsComponent.getButtonType(buttonElement);

    const isMinorUpdate = checkForMinorUpdate(this.#currentFilter, filterType);

    const movie = {
      ...this.#movie,
      userDetails: {
        ...this.#movie.userDetails,
        [filterType]: !(this.#movie.userDetails[filterType])
      },
      isPopupChange: true
    };

    this.#onChangeData(USER_ACTION.updateMovie, isMinorUpdate ? UPDATE_TYPE.minor : UPDATE_TYPE.patch, movie);
  }

  #handleActivationControlButtons = () => {
    this.disableControlButtons(false);
    this.#onDisableMovieCardControlButtons(false);
  };

}
