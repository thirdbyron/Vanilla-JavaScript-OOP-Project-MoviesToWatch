import { getRandomInteger } from '../utils.js';

const COMMENT_FISH_DICTIONARY = {
  authors: ['Ilya, Rebenkov', 'Vasily Stay', 'Third Byron', 'Right Big'],
  commentText: ['a film that changed my life', 'a true masterpiece', 'post-credit scene was just amazing omg.'],
  emotions: ['smile', 'sleeping', 'puke', 'angry']
};

const countIdNumber = () => {
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
};

const getIdNumber = countIdNumber();

export const generateCommentFish = () => {

  const randomAuthor = COMMENT_FISH_DICTIONARY.authors[getRandomInteger(0, COMMENT_FISH_DICTIONARY.authors.length - 1)];

  const randomCommentText = COMMENT_FISH_DICTIONARY.commentText[getRandomInteger(0, COMMENT_FISH_DICTIONARY.commentText.length - 1)];

  const randomEmotion = COMMENT_FISH_DICTIONARY.emotions[getRandomInteger(0, COMMENT_FISH_DICTIONARY.emotions.length - 1)];

  return {
    'id': getIdNumber(),
    'author': randomAuthor,
    'comment': randomCommentText,
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': randomEmotion,
  };

};
