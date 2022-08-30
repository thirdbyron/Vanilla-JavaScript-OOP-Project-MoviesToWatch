import AbstractView from '../../../framework/view/abstract-view.js';

const createMovieCommentsWrapperTemplate = (commentsQuantity) => `<div class="film-details__bottom-container">
<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

</section>
</div>`;

export default class MovieCommentsWrapperView extends AbstractView {

  #commentsQuantity = null;

  constructor(commentsQuantity) {
    super();

    this.#commentsQuantity = commentsQuantity;
  }

  get template() {
    return createMovieCommentsWrapperTemplate(this.#commentsQuantity);
  }

  changeCommentsCounter(commentsQuantity) {
    this.element.querySelector('.film-details__comments-count').innerHTML = commentsQuantity;
  }

  addErrorTemplate = () => {
    this.shake();
    const errorTemplate = 'Can\'t get response from server, sorry!';
    this.element.querySelector('.film-details__comments-wrap').insertAdjacentHTML('beforeend', errorTemplate);
  };

}

