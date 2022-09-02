import { render, replace } from '../framework/render.js';
import ProfileThumbnailView from '../view/profile-thumbnail-view.js';

export default class ProfileThumbnailPresenter {

  #mainContainer = null;
  #moviesModel = null;
  #profileThumbnailComponent = null;
  #updatedProfileThumbnailComponent = null;

  init(mainContainer, moviesModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleUpdateProfileThumbnailView);

    this.#profileThumbnailComponent = new ProfileThumbnailView(this.#moviesModel.movies);

    render(this.#profileThumbnailComponent, this.#mainContainer);
  }

  #handleUpdateProfileThumbnailView = () => {
    let needToUpdate = false;

    if (this.#profileThumbnailComponent.movies.length !== 0) {
      for (let i = 0; i < this.#moviesModel.movies.length; i++) {
        const updatedMovie = this.#moviesModel.movies[i];
        const prevMovie = this.#profileThumbnailComponent.movies[i];
        if (updatedMovie.userDetails.watched !== prevMovie.userDetails.watched) {
          needToUpdate = true;
          break;
        }
      }
    }

    if (needToUpdate || this.#profileThumbnailComponent.movies.length === 0) {
      this.#updatedProfileThumbnailComponent = new ProfileThumbnailView(this.#moviesModel.movies);

      replace(this.#updatedProfileThumbnailComponent, this.#profileThumbnailComponent);

      this.#profileThumbnailComponent = this.#updatedProfileThumbnailComponent;
    }
  };

}
