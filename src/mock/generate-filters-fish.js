import { moviesPerFilter } from '../utils/filters.js';

export const generateFiltersFish = (movies) => Object.entries(moviesPerFilter).map(([filterName, moviesCounter]) => ({
  name: filterName,
  quantity: moviesCounter(movies)
}));
