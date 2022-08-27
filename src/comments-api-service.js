import { METHOD } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {

  getComments(movieId) {
    return this._load({ url: `comments/${movieId}` })
      .then(ApiService.parseResponse);
  }

  pushNewComment = async (comment, movieId) => {
    const response = await this._load({
      url: `comments/${movieId}`,
      method: METHOD.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

}
