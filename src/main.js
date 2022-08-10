import { render } from './render.js';
import ProfileThumbnailView from './view/profile-thumbnail-view.js';
import NavigationBarView from './view/navigation-bar-view.js';
import SortingBarView from './view/sorting-bar-view.js';
import ContentPresenter from './presenter/content-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const contentPresenter = new ContentPresenter;

render(new ProfileThumbnailView, siteHeaderElement);
render(new NavigationBarView, siteMainElement);
render(new SortingBarView, siteMainElement);

contentPresenter.init(siteMainElement);
