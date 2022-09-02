import { render, remove, replace } from '../framework/render.js';
import { UPDATE_TYPE, USER_ACTION } from '../const.js';
import { checkForMinorUpdate } from '../utils/filters.js';
import MovieCardView from '../view/content/movie-card-view.js';
import MovieCardControlButtonsView from '../view/content/movie-card-control-buttons-view.js';
import PopupPresenter from './popup-presenter.js';

export default class MovieCardPresenter {

  #moviesListComponent = null;
  #movie = null;
  #isPopupOnly = null;
  #scrollPosition = null;
  #commentsModel = null;
  #bodyNode = null;
  #removePreviousPopup = null;
  #onChangeData = null;
  #currentFilter = null;
  #movieCardComponent = null;
  #movieCardControlButtonsComponent = null;
  #popupPresenter = null;
  #isPopupOpen = false;

  get isPopupOpen() {
    return this.#isPopupOpen;
  }

  set isPopupOpen(value) {
    if (typeof value !== 'boolean') {
      throw new Error('Setter of this class needs a boolean arg');
    }
    this.#isPopupOpen = value;
  }

  get movie() {
    return this.#movie;
  }

  get isPopupOnly() {
    return this.#isPopupOnly;
  }

  get popupScrollPosition() {
    return this.#popupPresenter.popupScrollPosition;
  }


  init(moviesListComponent, movie, isPopupOnly, scrollPosition, commentsModel, bodyNode, onRemovePreviousPopup, onChangeData, currentFilter) {

    this.#moviesListComponent = moviesListComponent;
    this.#movie = movie;
    this.#isPopupOnly = isPopupOnly;
    this.#scrollPosition = scrollPosition;
    this.#commentsModel = commentsModel;
    this.#bodyNode = bodyNode;
    this.#removePreviousPopup = onRemovePreviousPopup;
    this.#onChangeData = onChangeData;
    this.#currentFilter = currentFilter;

    this.#popupPresenter = new PopupPresenter;

    this.#renderMovieCard(this.#movie);
  }

  destroy() {
    this.#movieCardComponent.removeHandlers();
    this.#movieCardControlButtonsComponent.removeHandlers();
    remove(this.#movieCardControlButtonsComponent);
    remove(this.#movieCardComponent);
    if (this.isPopupOpen) {
      this.clearPreviousPopup();
    }
  }

  setMovie(newMovie) {
    this.#movie = newMovie;
    if (this.isPopupOpen) {
      this.#popupPresenter.movie = newMovie;
      this.#popupPresenter.getMovieDescriptionPresenter().setMovie(newMovie);
    }
  }

  clearPreviousPopup() {
    this.#popupPresenter.clear();
  }

  shakeElementWhileError = () => {
    this.#movieCardControlButtonsComponent.shakeAbsolute(this.#handleActivationControlButtons);
  };

  rerenderMovieCard() {
    const newMovieCardComponent = new MovieCardView(this.#movie);

    replace(newMovieCardComponent, this.#movieCardComponent);

    this.#movieCardComponent = newMovieCardComponent;

    this.#movieCardControlButtonsComponent = new MovieCardControlButtonsView(this.#movie);
    render(this.#movieCardControlButtonsComponent, this.#movieCardComponent.element);

    this.#setHandlers();

    if (this.isPopupOpen) {
      this.#popupPresenter.getMovieDescriptionPresenter().rerenderControllButtons();
    }
  }

  rerenderPopupControllButtons(movie) {
    this.#popupPresenter.getMovieDescriptionPresenter().rerenderControllButtons(movie);
  }

  #renderMovieCard(movie) {
    this.#movieCardComponent = new MovieCardView(movie);
    this.#movieCardControlButtonsComponent = new MovieCardControlButtonsView(movie);

    if (this.isPopupOnly) {
      this.#presentPopup();
    }

    render(this.#movieCardComponent, this.#moviesListComponent.element);
    render(this.#movieCardControlButtonsComponent, this.#movieCardComponent.element);

    this.#setHandlers();
  }

  #setHandlers() {
    this.#movieCardComponent.setPopupClickHandler(() => {
      this.#removePreviousPopup();
      this.#hideOverflow();
      this.#presentPopup();
    });
    this.#movieCardControlButtonsComponent.setFavoriteClickHandler(() => {
      this.#handleDisablingControlButtons(true);
      this.#handleDisablingPopupControlButtons(true);
      this.#handleControlButtonClick(this.#movieCardControlButtonsComponent.favoriteButtonElement);
    });
    this.#movieCardControlButtonsComponent.setWatchedClickHandler(() => {
      this.#handleDisablingControlButtons(true);
      this.#handleDisablingPopupControlButtons(true);
      this.#handleControlButtonClick(this.#movieCardControlButtonsComponent.watchedButtonElement);
    });
    this.#movieCardControlButtonsComponent.setWatchlistClickHandler(() => {
      this.#handleDisablingControlButtons(true);
      this.#handleDisablingPopupControlButtons(true);
      this.#handleControlButtonClick(this.#movieCardControlButtonsComponent.watchlistButtonElement);
    });
  }

  #presentPopup() {
    this.isPopupOpen = true;
    this.#popupPresenter.init(
      this.#bodyNode,
      this.#movie,
      this.#commentsModel,
      this.#onChangeData,
      this.#currentFilter,
      this.#scrollPosition,
      this.#handlePopupClose,
      this.#handleDisablingControlButtons
    );
  }

  getPopupPresenter = () => this.#popupPresenter;

  #hideOverflow = () => {
    if (!document.querySelector('body').classList.contains('hide-overflow')) {
      document.querySelector('body').classList.add('hide-overflow');
    }
  };

  #handleControlButtonClick(buttonElement) {
    const filterType = this.#movieCardControlButtonsComponent.getButtonType(buttonElement);

    const isMinorUpdate = checkForMinorUpdate(this.#currentFilter, filterType);

    const movie = {
      ...this.#movie,
      userDetails: {
        ...this.#movie.userDetails,
        [filterType]: !(this.#movie.userDetails[filterType])
      },
      isPopupChange: false
    };

    this.#onChangeData(USER_ACTION.updateMovie, isMinorUpdate ? UPDATE_TYPE.minor : UPDATE_TYPE.patch, movie);
  }

  #handlePopupClose = () => {
    this.isPopupOpen = false;
  };

  #handleDisablingControlButtons = (isDisabled) => {
    this.#movieCardControlButtonsComponent.disableControlButtons(isDisabled);
  };

  #handleDisablingPopupControlButtons = (isDisabled) => {
    if (this.isPopupOpen) {
      this.#popupPresenter.getMovieDescriptionPresenter().disablePopupControlButtons(isDisabled);
    }
  };

  #handleActivationControlButtons = () => {
    this.#handleDisablingControlButtons(false);
    this.#handleDisablingPopupControlButtons(false);
  };

}
