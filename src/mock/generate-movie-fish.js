import { getRandomInteger } from '../utils.js';
import { MOVIE_TITLES_DICTIONARY, MOVIE_DESCRIPTIONS } from '../temporary_data.js';

const generateRandomMovieTitle = (dictionary) => {
  const titles = Object.keys(dictionary);

  return titles[getRandomInteger(0, titles.length - 1)];
};

const generateRandomMovieDescription = (descriptions) => {

  const descriptionLength = getRandomInteger(1, descriptions.length);

  let randomDescription = '';

  for (let i = 0; i < descriptionLength; i++) {
    randomDescription += descriptions[getRandomInteger(0, descriptionLength - 1)];
  }

  return randomDescription;
};

export const generateMovieFish = () => {

  const randomTitle = generateRandomMovieTitle(MOVIE_TITLES_DICTIONARY);
  const posterLink = MOVIE_TITLES_DICTIONARY[randomTitle];
  const randomDescription = generateRandomMovieDescription(MOVIE_DESCRIPTIONS);

  return {
    'id': '0',
    'comments': [
      'test comment 1', 'test comment 2'
    ],
    'film_info': {
      'title': randomTitle,
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': posterLink,
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'runtime': 77,
      'genre': [
        'Comedy'
      ],
      'description': randomDescription
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  };
};
