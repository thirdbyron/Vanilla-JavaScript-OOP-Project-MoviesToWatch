import { render, replace } from '../framework/render.js';
import { generateFiltersFish } from '../mock/generate-filters-fish.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {

  #mainContainer = null;
  #movies = null;
  #filtersComponent = null;
  #updatedFiltersComponent = null;

  init(mainContainer, movies) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#filtersComponent = new FiltersView(generateFiltersFish(this.#movies));

    render(this.#filtersComponent, this.#mainContainer);

  }

  updateFilters = () => {
    this.#updatedFiltersComponent = new FiltersView(generateFiltersFish(this.#movies));

    replace(this.#updatedFiltersComponent, this.#filtersComponent);

    this.#filtersComponent = this.#updatedFiltersComponent;
  };

  getActualMovies = (actualMovies) => {
    this.#movies = actualMovies;
  };

}
