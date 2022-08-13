import { getRandomInteger } from '../utils.js';
import { MAX_MOVIE_COMENTS } from '../const.js';

const MOVIE_FISH_DICTIONARY = {
  posters: {
    'Made for each other': './images/posters/made-for-each-other.png',
    'Popeye meets Sindbad': './images/posters/popeye-meets-sinbad.png',
    'Sagebrush trail': './images/posters/sagebrush-trail.jpg',
    'Santa Claus conquers the martians': './images/posters/santa-claus-conquers-the-martians.jpg',
    'The dance of life': './images/posters/the-dance-of-life.jpg',
    'The greate flamarion': './images/posters/the-great-flamarion.jpg',
    'The man with the golden': './images/posters/the-man-with-the-golden-arm.jpg'
  },
  descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Cras aliqu varius magna, non portafgsgddgsQWEJKLggula gfdhj feughhiat eget.']
};


const generateRandomMovieTitle = (postersDictionary) => {
  const titles = Object.keys(postersDictionary);

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

const generateRandomCommentsId = () => {
  const idNumbers = [];
  const randomMaximumOfComments = getRandomInteger(0, MAX_MOVIE_COMENTS);
  if (randomMaximumOfComments > 0) {
    for (let i = 0; i < randomMaximumOfComments; i++) {
      const randomId = getRandomInteger(1, MAX_MOVIE_COMENTS);
      idNumbers.push(randomId);
    }
  }
  return idNumbers;
};

export const generateMovieFish = () => {
  const randomTitle = generateRandomMovieTitle(MOVIE_FISH_DICTIONARY.posters);
  const posterLink = MOVIE_FISH_DICTIONARY.posters[randomTitle];
  const randomDescription = generateRandomMovieDescription(MOVIE_FISH_DICTIONARY.descriptions);

  return {
    'id': '0',
    'comments': [...new Set(generateRandomCommentsId())],
    'film_info': {
      'title': randomTitle,
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': posterLink,
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano', 'Kitano Keshi'
      ],
      'actors': [
        'Morgan Freeman', 'Elvis Cruise', 'Ronaldo DiCaprio'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'runtime': 77,
      'genre': [
        'Comedy', 'Drama'
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
