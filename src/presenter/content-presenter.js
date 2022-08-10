import { render } from '../render.js';
import ContentView from '../view/content-view.js';
import MoviesListView from '../view/movies-list-view.js';
import MoviesListContainerView from '../view/movies-list-container-view.js';
import MovieCardView from '../view/movie-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { INITIAL_MOVIE_CARDS_QUANTITY } from '../const.js';


export default class ContentPresenter {
  contentComponent = new ContentView;
  moviesListComponent = new MoviesListView;
  moviesListContainerComponent = new MoviesListContainerView;
  showMoreButtonComponent = new ShowMoreButtonView;

  init(mainContainer) {
    render(this.contentComponent, mainContainer);
    render(this.moviesListComponent, this.contentComponent.getElement());
    render(this.moviesListContainerComponent, this.moviesListComponent.getElement());
    render(this.showMoreButtonComponent, this.moviesListComponent.getElement());

    for (let i = 1; i <= INITIAL_MOVIE_CARDS_QUANTITY; i++) {
      render(new MovieCardView, this.moviesListContainerComponent.getElement());
    }

  }
}
