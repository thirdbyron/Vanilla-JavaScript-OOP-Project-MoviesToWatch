import { remove, render } from '../framework/render.js';
import ShowMoreButtonView from '../view/content/show-more-button-view.js';
import { MOVIES_PER_ROW } from '../const.js';

export default class ShowMoreButtonPresenter {

  #mainContainer = null;
  #movies = null;
  #onRenderMovie = null;
  #showMoreButtonComponent = null;
  #renderedMoviesCounter = MOVIES_PER_ROW;
  #isDestroyed = false;

  init(mainContainer, movies, onRenderMovie) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;
    this.#onRenderMovie = onRenderMovie;

    this.#renderShowMoreButton();

    this.#setShowMoreHandlers();

  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView;
    render(this.#showMoreButtonComponent, this.#mainContainer);
  }

  destroy() {
    if (!this.#isDestroyed) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #setShowMoreHandlers() {
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreClick);
  }

  #handleShowMoreClick = () => {
    this.#movies
      .slice(this.#renderedMoviesCounter, this.#renderedMoviesCounter + MOVIES_PER_ROW)
      .forEach((movie) => {
        this.#onRenderMovie(movie);
      });

    this.#renderedMoviesCounter += MOVIES_PER_ROW;

    if (this.#renderedMoviesCounter >= this.#movies.length) {
      remove(this.#showMoreButtonComponent);
      this.#isDestroyed = true;
    }
  };

}
