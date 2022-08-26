import AbstractView from '../../../framework/view/abstract-view.js';

const createMovieCommentsWrapperTemplate = (movie) => `<div class="film-details__bottom-container">
<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movie.comments.length}</span></h3>

</section>
</div>`;

export default class MovieCommentsWrapperView extends AbstractView {

  #movie = null;

  constructor(movie) {
    super();

    this.#movie = movie;
  }

  get template() {
    return createMovieCommentsWrapperTemplate(this.#movie);
  }

  changeCommentsCounter(movie) {
    this.element.querySelector('.film-details__comments-count').innerHTML = movie.comments.length;
  }

}

