import ProfileThumbnailView from './view/profile-thumbnail-view.js';
import NavigationBarView from './view/navigation-bar-view.js';
import SortingBarView from './view/sorting-bar-view.js';
import { render } from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(new ProfileThumbnailView, siteHeaderElement);
render(new NavigationBarView, siteMainElement);
render(new SortingBarView, siteMainElement);
