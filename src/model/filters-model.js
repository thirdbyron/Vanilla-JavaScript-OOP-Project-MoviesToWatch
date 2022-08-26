import Observable from '../framework/observable.js';
import {FILTER_TYPE} from '../const.js';

export default class FiltersModel extends Observable {
  #filter = Object.keys(FILTER_TYPE).find((key) => FILTER_TYPE[key] === FILTER_TYPE.all);

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
