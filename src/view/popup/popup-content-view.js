import AbstractView from '../../framework/view/abstract-view.js';

const createPopupContentTemplate = () => '<div class="film-details__inner"> </div>';

export default class PopupContentView extends AbstractView{

  get template() {
    return createPopupContentTemplate();
  }

}

