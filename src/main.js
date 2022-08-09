import MoviesNavBarView from './view/movies-nav-bar-view.js';
import { render } from './render.js';

const siteMainElement = document.querySelector('.main');

render(new MoviesNavBarView, siteMainElement);
