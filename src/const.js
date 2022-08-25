export const MAX_MOVIE_COMENTS = 9;

export const MAX_MOVIES = 8;

export const MOVIES_PER_ROW = 5;

export const MINUTES_IN_ONE_HOUR = 60;

export const MAX_SYMBOLS_IN_MOVIE_CARD = 140;

export const CONTINOUS_SYMBOL = '...';

export const MOVIE_ONLY_FOR_POPUP_ID = 'movie_for_popup';

export const EMPTY_MOVIE_LIST_TITLES = {
  all: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now',
};

export const FILTER_TYPE = {
  all: 'All movies',
  watchlist: 'Watchlist',
  history: 'History',
  favorites: 'Favorites',
};

export const FILTER_FROM_DATA = {
  watchlist: 'watchlist',
  watched: 'already_watched',
  favorite: 'favorite',
};

export const FILTER_FROM_DATA_TO_TYPE = {
  [FILTER_FROM_DATA.watchlist]: FILTER_TYPE.watchlist.toLowerCase(),
  [FILTER_FROM_DATA.watched]: FILTER_TYPE.history.toLowerCase(),
  [FILTER_FROM_DATA.favorite]: FILTER_TYPE.favorites.toLowerCase(),
};

export const SORT_TYPE = {
  default: 'default',
  date: 'by_date',
  rating: 'by_rating'
};

export const USER_ACTION = {
  updateMovie: 'update_movie',
  sortMovies: 'sort_movies'
};

export const UPDATE_TYPE = {
  patch: 'PATCH',
  minor: 'MINOR',
  major: 'MAJOR',
};

export const KEYS_CODE = {
  enter: 13
};

