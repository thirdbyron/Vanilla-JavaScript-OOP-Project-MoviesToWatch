import { METHOD } from './const.js';
import ApiService from './framework/api-service.js';

export default class MoviesApiService extends ApiService {

  get movies() {
    return this._load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (movie) => {
    const adaptedMovie = {
      ...movie,
      'film_info': {
        ...movie.filmInfo,
        runtime: movie.filmInfo.rawRuntime,
        'age_rating': movie.filmInfo.ageRating,
        'alternative_title': movie.filmInfo.alternativeTitle,
        'total_rating': movie.filmInfo.totalRating,
        release: {
          date: movie.filmInfo.release.rawDate,
          'release_country': movie.filmInfo.release.country
        },
        actors: movie.filmInfo.actorsList.split(','),
        writers: movie.filmInfo.writersList.split(','),
      },
      'user_details': {
        ...movie.userDetails,
        'watching_date': movie.userDetails.watchingDate,
        'already_watched': movie.userDetails.watched,
      }
    };

    delete adaptedMovie.filmInfo;
    delete adaptedMovie.userDetails;
    delete adaptedMovie['film_info'].genreSectionName;
    delete adaptedMovie['film_info'].genreListTemplate;
    delete adaptedMovie['film_info'].actorsList;
    delete adaptedMovie['film_info'].writersList;
    delete adaptedMovie['film_info'].ageRating;
    delete adaptedMovie['film_info'].alternativeTitle;
    delete adaptedMovie['film_info'].rawRuntime;
    delete adaptedMovie['film_info'].totalRating;
    delete adaptedMovie['user_details'].watched;
    delete adaptedMovie['user_details'].watchingDate;
    delete adaptedMovie.isPopupChange;
    delete adaptedMovie.isCommentsChange;

    return adaptedMovie;

  };
}
