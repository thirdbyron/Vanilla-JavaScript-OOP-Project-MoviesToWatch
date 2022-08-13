import { render } from '../render.js';

import ShowMoreButtonView from '../view/content/show-more-button-view.js';

export default class ShowMoreButtonPresenter {

  #mainContainer = null;

  #showMoreButtonComponent = new ShowMoreButtonView;

  init(mainContainer) {

    this.#mainContainer = mainContainer;

    render(this.#showMoreButtonComponent, this.#mainContainer);
  }
}
