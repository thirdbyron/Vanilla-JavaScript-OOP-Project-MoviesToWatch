import { remove, render } from '../framework/render.js';
import { MOVIES_PER_ROW } from '../const.js';
import ShowMoreButtonView from '../view/content/show-more-button-view.js';

export default class ShowMoreButtonPresenter {

  #mainContainer = null;
  #movies = null;
  #onRenderMovie = null;
  #showMoreButtonComponent = null;
  #quantityOfRenderedMovies = MOVIES_PER_ROW;
  #isDestroyed = false;

  get quantityOfRenderedMovies() {
    return this.#quantityOfRenderedMovies;
  }

  init(mainContainer, movies, onRenderMovie, quantityOfRenderedMovies) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#onRenderMovie = onRenderMovie;
    this.#quantityOfRenderedMovies = quantityOfRenderedMovies;

    this.#renderShowMoreButton();

    this.#setShowMoreHandlers();
  }

  destroy() {
    if (!this.#isDestroyed) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView;
    render(this.#showMoreButtonComponent, this.#mainContainer);
  }

  #setShowMoreHandlers() {
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreClick);
  }

  #handleShowMoreClick = () => {
    const slicedMovies = this.#movies.slice(this.#quantityOfRenderedMovies, this.#quantityOfRenderedMovies + MOVIES_PER_ROW);

    slicedMovies.forEach((movie) => {
      this.#onRenderMovie(movie);
    });

    this.#quantityOfRenderedMovies += slicedMovies.length;

    if (this.#quantityOfRenderedMovies >= this.#movies.length) {
      remove(this.#showMoreButtonComponent);
      this.#isDestroyed = true;
    }
  };

}
