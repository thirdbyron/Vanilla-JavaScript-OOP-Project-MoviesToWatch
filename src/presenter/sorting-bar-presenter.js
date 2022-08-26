import { render, remove } from '../framework/render.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';
import SortingBarView from '../view/sorting-bar-view.js';

export default class SortingBarPresenter {

  #mainContainer = null;
  #currentSortType = null;
  #sortingBarComponent = null;
  #onChangeData = null;

  init(mainContainer, currentSortType, onChangeData) {

    this.#mainContainer = mainContainer;
    this.#currentSortType = currentSortType;
    this.#onChangeData = onChangeData;

    this.#renderSortBar(this.#currentSortType);

    this.#sortingBarComponent.setSortTypeChangeHandler(this.#handleCurrentSortType);

  }

  destroy() {
    remove(this.#sortingBarComponent);
  }

  #renderSortBar(sortType) {
    this.#sortingBarComponent = new SortingBarView(sortType);
    render(this.#sortingBarComponent, this.#mainContainer);
  }

  #handleCurrentSortType = (choosenSortType) => {
    if (choosenSortType !== this.#currentSortType) {
      this.#onChangeData(USER_ACTION.sortMovies, UPDATE_TYPE.minor, choosenSortType);
    }
  };

}


