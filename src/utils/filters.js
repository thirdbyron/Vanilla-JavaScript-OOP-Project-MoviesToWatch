import { FILTER_TYPE } from '../const.js';

export const moviesPerFilter = {
  [FILTER_TYPE.all]: (movies) => [...movies],
  [FILTER_TYPE.watchlist]: (movies) => movies.filter((movie) => movie.user_details.watchlist === true),
  [FILTER_TYPE.history]: (movies) => movies.filter((movie) => movie.user_details.already_watched === true),
  [FILTER_TYPE.favorites]: (movies) => movies.filter((movie) => movie.user_details.favorite === true),
};
