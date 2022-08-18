import dayjs from 'dayjs';
import { MINUTES_IN_ONE_HOUR, MAX_SYMBOLS_IN_MOVIE_CARD, CONTINOUS_SYMBOL } from '../const.js';

export const formatRawDateToRealeaseYear = (releaseDate) => dayjs(releaseDate).format('YYYY');

export const validateDescription = (desc) => {

  if (typeof desc !== 'string') {
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

export const translateMinutesToRuntime = (minutes) => {

  if (minutes > MINUTES_IN_ONE_HOUR) {

    const hours = Math.floor(minutes / MINUTES_IN_ONE_HOUR);
    const minutesRest = minutes % MINUTES_IN_ONE_HOUR;

    return `${hours}h ${minutesRest}m`;
  }

  return minutes;
};

export const formatRawDateToRealeaseDate = (releaseDate) => dayjs(releaseDate).format('D MMMM YYYY');

export const formatRawDateToCommentCreatedDate = (date) => dayjs(date).format('YYYY/M/D H:mm');

const getWeightForNullDate = (movieA, movieB) => {
  if (movieA === null && movieB === null) {
    return 0;
  }

  if (movieA === null) {
    return 1;
  }

  if (movieB === null) {
    return -1;
  }

  return null;
};

export const sortMovieByDate = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.film_info.runtime, movieB.film_info.runtime);

  return weight ?? dayjs(movieB.film_info.release.date).diff(dayjs(movieA.film_info.release.date));
};

export const sortMovieByRating = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.film_info.total_rating, movieB.film_info.total_rating);

  return weight ?? (movieB.film_info.total_rating - movieA.film_info.total_rating);
};

