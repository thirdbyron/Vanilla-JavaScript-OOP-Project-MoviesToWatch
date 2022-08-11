import dayjs from 'dayjs';
import { MINUTES_IN_ONE_HOUR, MAX_SYMBOLS_IN_MOVIE_CARD, CONTINOUS_SYMBOL } from './const.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formatRawDateToRealeaseYear = (releaseDate) => dayjs(releaseDate).format('YYYY');

export const formatRawDateToRealeaseDate = (releaseDate) => dayjs(releaseDate).format('D MMMM YYYY');

export const translateMinutesToRuntime = (minutes) => {

  if (minutes > MINUTES_IN_ONE_HOUR) {

    const hours = Math.floor(minutes / MINUTES_IN_ONE_HOUR);
    const minutesRest = minutes % MINUTES_IN_ONE_HOUR;

    return `${hours}h ${minutesRest}m`;
  }

  return minutes;
};

export const validateDescription = (desc) => {

  if (typeof desc !== 'string' || desc === null) {
    return '';
  }

  const symbolsOfDescription = desc.split('');

  if (symbolsOfDescription.length > MAX_SYMBOLS_IN_MOVIE_CARD) {
    symbolsOfDescription.length = MAX_SYMBOLS_IN_MOVIE_CARD - 1;
    let shortDesc = symbolsOfDescription.join('');
    shortDesc += CONTINOUS_SYMBOL;
    return shortDesc;
  }

  return desc;
};

export const validateCommentsNumber = (comments) => {

  if (comments.length === 0 || comments.length > 1) {
    return `${comments.length} comments`;
  }

  return '1 comment';
};

export const getNameOfSectionWithGenres = (genres) => {
  if (genres.length > 1) {
    return 'Genres';
  }
  return 'Genre';
};

export const renderGenresListTemplate = (genres) => {
  if (genres.length > 0) {
    let genresListTemplate = '';
    for (let i = 0; i < genres.length; i++) {
      genresListTemplate += `<span class="film-details__genre">${genres[i]}</span>`;
    }
    return genresListTemplate;
  }
  return '';
};
