import { PROFILE_RATING } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createProfileRatingTempalte = (userRating) => `<p class="profile__rating">${userRating}</p>`;

const createProfileThumbnailTemplate = (userRating) => `<section class="header__profile profile">
${userRating !== null ? createProfileRatingTempalte(userRating) : ''}
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

export default class ProfileThumbnailView extends AbstractView {

  #movies = null;
  #userRating = null;

  constructor(movies) {
    super();

    this.#movies = [...movies];

    this.#userRating = this.#movies.length > 0 ? this.#getUserRating(this.#movies) : null;
  }

  get template() {
    return createProfileThumbnailTemplate(this.#userRating);
  }

  get movies() {
    return this.#movies;
  }

  #checkForUserRating(watchedMoviesQuantity) {
    if (watchedMoviesQuantity === PROFILE_RATING.noRatingGradation) {
      return null;
    } else if (watchedMoviesQuantity <= PROFILE_RATING.novice.gradation) {
      return PROFILE_RATING.novice.name;
    } else if (watchedMoviesQuantity <= PROFILE_RATING.fan.gradation) {
      return PROFILE_RATING.fan.name;
    } else if (watchedMoviesQuantity <= PROFILE_RATING.movieBuff.gradation) {
      return PROFILE_RATING.movieBuff.name;
    }
  }

  #getUserRating(movies) {
    const watchedMoviesQuantity = movies.filter((movie) => movie.userDetails.watched).length;

    const userRating = this.#checkForUserRating(watchedMoviesQuantity);

    return userRating;
  }

}
