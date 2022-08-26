import { moviesPerFilter } from '../utils/filters.js';
import { FILTER_TYPE } from '../const.js';

export const generateFiltersFish = (movies) => Object.entries(moviesPerFilter).map(([filterName, moviesCounter]) => ({
  name: filterName,
  quantity: moviesCounter(movies),
  type: Object.keys(FILTER_TYPE).find((key) => filterName === FILTER_TYPE[key])
}));
