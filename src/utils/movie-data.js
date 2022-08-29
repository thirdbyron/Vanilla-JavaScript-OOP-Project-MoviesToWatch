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
  const weight = getWeightForNullDate(movieA.filmInfo.release.rawDate, movieB.filmInfo.release.rawDate);

  return weight ?? dayjs(movieB.filmInfo.release.rawDate).diff(dayjs(movieA.filmInfo.release.rawDate));
};

export const sortMovieByRating = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.filmInfo.totalRating, movieB.filmInfo.totalRating);

  return weight ?? (movieB.filmInfo.totalRating - movieA.filmInfo.totalRating);
};

export const getNameOfSectionWithGenres = (genres) => genres.length > 1 ? 'Genres' : 'Genre';

export const createGenresListTemplate = (genres) => {
  if (genres.length > 0) {
    let genresListTemplate = '';
    for (let i = 0; i < genres.length; i++) {
      genresListTemplate += `<span class="film-details__genre">${genres[i]}</span>`;
    }
    return genresListTemplate;
  }
  return '';
};

