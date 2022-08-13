import { render } from '../render.js';

import ShowMoreButtonView from '../view/content/show-more-button-view.js';

import { MOVIES_PER_ROW } from '../const.js';

export default class ShowMoreButtonPresenter {

  #mainContainer = null;

  #movies = null;

  #showMoreButtonComponent = new ShowMoreButtonView;

  #renderedMoviesCounter = MOVIES_PER_ROW;

  init(mainContainer, movies, onRenderMovie) {

    this.#mainContainer = mainContainer;
    this.#movies = movies;

    render(this.#showMoreButtonComponent, this.#mainContainer);

    this.#showMoreButtonComponent.element.addEventListener('click', (evt) => {
      evt.preventDefault();

      this.#movies
        .slice(this.#renderedMoviesCounter, this.#renderedMoviesCounter + MOVIES_PER_ROW)
        .forEach((movie) => {
          onRenderMovie(movie);
        });

      this.#renderedMoviesCounter += MOVIES_PER_ROW;

      if (this.#renderedMoviesCounter >= this.#movies.length) {
        this.#showMoreButtonComponent.element.remove();
        this.#showMoreButtonComponent.removeElement();
      }

    });
  }
}
