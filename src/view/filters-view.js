import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter) => {
  const {name, quantity} = filter;
  return `<a href="#watchlist" class="main-navigation__item"> ${name} <span class="main-navigation__item-count">${quantity.length}</span></a>`;
};

const createFiltersTemplate = (filters) => {
  const filtersWithMovieQuantityTemplate = filters.map((filter) => createFilterItemTemplate(filter)).join('');

  return `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  ${filtersWithMovieQuantityTemplate}
  </nav>`;
};

export default class FiltersView extends AbstractView {

  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

  set filters(value) {
    this.#filters = value;
  }

  get filters() {
    return this.#filters;
  }

}
