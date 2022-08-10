import { render } from '../render.js';
import ContentView from '../view/content-view.js';
import MoviesListView from '../view/movies-list-view.js';
import MoviesListContainerView from '../view/movies-list-container-view.js';
import MovieCardView from '../view/movie-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { INITIAL_MOVIE_CARDS_QUANTITY } from '../const.js';


export default class ContentPresenter {
  contentElement = new ContentView;
  moviesListElement = new MoviesListView;
  moviesListContainerElement = new MoviesListContainerView;
  showMoreButtonElement = new ShowMoreButtonView;

  init(mainContainer) {
    render(this.contentElement, mainContainer);
    render(this.moviesListElement, this.contentElement.getElement());
    render(this.moviesListContainerElement, this.moviesListElement.getElement());
    render(this.showMoreButtonElement, this.moviesListElement.getElement());

    for (let i = 1; i <= INITIAL_MOVIE_CARDS_QUANTITY; i++) {
      render(new MovieCardView, this.moviesListContainerElement.getElement());
    }

  }
}
