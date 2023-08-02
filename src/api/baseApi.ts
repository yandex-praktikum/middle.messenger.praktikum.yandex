import { HTTPTransport } from '@services';
import { API_PATH } from '@constants';

export abstract class BaseApi {

	api = new HTTPTransport(API_PATH);
}
