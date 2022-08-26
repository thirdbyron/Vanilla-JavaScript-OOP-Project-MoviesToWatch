import { METHOD } from './const.js';
import ApiService from './framework/api-service.js';

export default class MoviesApiService extends ApiService {

  get movies() {
    return this._load({url: 'tasks'})
      .then(ApiService.parseResponse);
  }

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(movie),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
