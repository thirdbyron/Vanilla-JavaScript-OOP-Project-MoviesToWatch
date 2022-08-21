import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPE } from '../const.js';

const createFilterCounterTemplate = (name, quantity) => FILTER_TYPE.all !== name ? `<span class="main-navigation__item-count">${quantity.length}</span>` : '';

const createFilterItemTemplate = (filter, currentType) => {
  const { name, quantity, type } = filter;
  return `<a href="#${type}" class="main-navigation__item ${currentType === type ? 'main-navigation__item--active' : ''}" data-filter-type="${type}"> ${name} ${createFilterCounterTemplate(name, quantity)}</a>`;
};

const createFiltersTemplate = (filters, currentType) => {
  const filtersWithMovieQuantityTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentType)).join('');

  return `<nav class="main-navigation">
  ${filtersWithMovieQuantityTemplate}
  </nav>`;
};

export default class FiltersView extends AbstractView {

  #filters = null;
  #currentType = null;

  constructor(filters, currentType) {
    super();
    this.#filters = filters;
    this.#currentType = currentType;

    this.#checkForAllMoviesElementClass();
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentType);
  }

  get filterElements() {
    return this.element.querySelector('.main-navigation__item');
  }

  get allMoviesFilterElement() {
    return this.element.children[0];
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      this._callback.filterTypeChange(evt.target.dataset.filterType);
    } else if (evt.target.tagName === 'SPAN') {
      this._callback.filterTypeChange(evt.target.parentNode.dataset.filterType);
    }
  };

  #checkForAllMoviesElementClass() {
    if (FILTER_TYPE[this.#currentType] !== FILTER_TYPE.all) {
      this.allMoviesFilterElement.classList.remove('main-navigation__item--active');
    } else {
      if (!this.allMoviesFilterElement.className.includes('main-navigation__item--active')) {
        this.allMoviesFilterElement.classList.add('main-navigation__item--active');
      }
    }
  }

}
