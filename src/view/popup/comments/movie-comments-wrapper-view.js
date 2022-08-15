import AbstractView from '../../../framework/view/abstract-view.js';

const createMovieCommentsWrapperTemplate = () => `<div class="film-details__bottom-container">
<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

</section>
</div>`;

export default class MovieCommentsWrapperView extends AbstractView {

  get template() {
    return createMovieCommentsWrapperTemplate();
  }

}

