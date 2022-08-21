import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPE } from '../const.js';

const createSortingBarTemplate = (currentSortType) => `<ul class="sort">
<li><a href="#" data-sort-type="${SORT_TYPE.default}" class="sort__button ${currentSortType === SORT_TYPE.default ? 'sort__button--active' : ''}">Sort by default</a></li>
<li><a href="#" data-sort-type="${SORT_TYPE.date}" class="sort__button ${currentSortType === SORT_TYPE.date ? 'sort__button--active' : ''}">Sort by date</a></li>
<li><a href="#" data-sort-type="${SORT_TYPE.rating}" class="sort__button ${currentSortType === SORT_TYPE.rating ? 'sort__button--active' : ''}">Sort by rating</a></li>
</ul>`;

export default class SortingBarView extends AbstractView {

  #currentSortType = null;

  constructor(currentSortType) {
    super();

    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortingBarTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      this._callback.sortChange(evt.target.dataset.sortType);
    }
  };

}
