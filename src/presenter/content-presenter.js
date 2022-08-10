import { render } from '../render.js';
import ContentView from '../view/content/content-view.js';
import MoviesListWrapperView from '../view/content/movies-list-wrapper-view.js';
import moviesListView from '../view/content/movies-list-view.js';
import MovieCardView from '../view/content/movie-card-view.js';
import ShowMoreButtonView from '../view/content/show-more-button-view.js';
import { INITIAL_MOVIE_CARDS_QUANTITY } from '../const.js';


export default class ContentPresenter {
  contentComponent = new ContentView;
<<<<<<< HEAD
  moviesListWrapperComponent = new MoviesListWrapperView;
  moviesListComponent = new moviesListView;
  showMoreButtonComponent = new ShowMoreButtonView;

  init(mainContainer) {
    render(this.contentComponent, mainContainer);
    render(this.moviesListWrapperComponent, this.contentComponent.getElement());
    render(this.moviesListComponent, this.moviesListWrapperComponent.getElement());
    render(this.showMoreButtonComponent, this.moviesListWrapperComponent.getElement());

    for (let i = 1; i <= INITIAL_MOVIE_CARDS_QUANTITY; i++) {
      render(new MovieCardView, this.moviesListComponent.getElement());
=======
  moviesListComponent = new MoviesListView;
  moviesListContainerComponent = new MoviesListContainerView;
  showMoreButtonComponent = new ShowMoreButtonView;

  init(mainContainer) {
    render(this.contentElement, mainContainer);
    render(this.moviesListComponent, this.contentElement.getElement());
    render(this.moviesListContainerComponent, this.moviesListComponent.getElement());
    render(this.showMoreButtonComponent, this.moviesListComponent.getElement());

    for (let i = 1; i <= INITIAL_MOVIE_CARDS_QUANTITY; i++) {
      render(new MovieCardView, this.moviesListContainerComponent.getElement());
>>>>>>> 01bd2eae7f59b091f0690e84cbe02bb7aa4082c0
    }

  }
}
