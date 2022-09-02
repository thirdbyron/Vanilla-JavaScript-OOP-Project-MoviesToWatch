import { render, replace } from '../framework/render.js';
import { UPDATE_TYPE } from '../const.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {

  #mainContainer = null;
  #moviesModel = null;
  #filtersModel = null;
  #filtersComponent = null;
  #updatedFiltersComponent = null;

  init(mainContainer, moviesModel, filtersModel) {

    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#filtersModel = filtersModel;

    this.#filtersModel.addObserver(this.#handleUpdateFiltersView);
    this.#moviesModel.addObserver(this.#handleUpdateFiltersView);

    this.#renderFilters();
  }

  #renderFilters() {
    this.#filtersComponent = new FiltersView(this.#moviesModel.movies, this.#filtersModel.filter);

    render(this.#filtersComponent, this.#mainContainer);

    this.#filtersComponent.setFilterTypeChangeHandler(this.#handleSetFilter);
  }

  #handleUpdateFiltersView = () => {
    this.#updatedFiltersComponent = new FiltersView(this.#moviesModel.movies, this.#filtersModel.filter);

    replace(this.#updatedFiltersComponent, this.#filtersComponent);

    this.#filtersComponent = this.#updatedFiltersComponent;

    this.#filtersComponent.setFilterTypeChangeHandler(this.#handleSetFilter);
  };

  #handleSetFilter = (filterType) => {
    if (this.#filtersModel.filter !== filterType) {
      this.#filtersModel.setFilter(UPDATE_TYPE.major, filterType);
    }
  };

}
