import { FILTER_TYPE } from '../const.js';

export const moviesPerFilter = {
  [FILTER_TYPE.all]: (movies) => [...movies],
  [FILTER_TYPE.watchlist]: (movies) => movies.filter((movie) => movie.userDetails.watchlist === true),
  [FILTER_TYPE.history]: (movies) => movies.filter((movie) => movie.userDetails.watched === true),
  [FILTER_TYPE.favorites]: (movies) => movies.filter((movie) => movie.userDetails.favorite === true),
};

export const generateFilters = (movies) => Object.entries(moviesPerFilter).map(([filterName, moviesCounter]) => ({
  name: filterName,
  filteredMovies: moviesCounter(movies),
  type: Object.keys(FILTER_TYPE).find((key) => filterName === FILTER_TYPE[key])
}));
