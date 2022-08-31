import AbstractView from '../../framework/view/abstract-view.js';

const createPopupWrapperTemplate = () => '<section class="film-details"> </section>';

export default class PopupWrapperView extends AbstractView{

  #scrollPosition = null;

  constructor(scrollPosition) {
    super();

    this.#scrollPosition = scrollPosition;

  }

  get template() {
    return createPopupWrapperTemplate();
  }

  get scrollPosition() {
    return this.element.scrollTop;
  }

  setScrollPosition = () => {
    this.element.scrollTop = this.#scrollPosition;
  };

}

