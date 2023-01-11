import BaseAPI from './base-api';
import { ISigninData, ISignupData, IUserData } from '../utils/interfaces';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }
  
  public signin(data: ISigninData) {
    return this.http.post('/signin', data);
  }

  public signup(data: ISignupData) {
    return this.http.post('/signup', data);
  }

  public read(): Promise<IUserData> {
    return this.http.get('/user');
  }

  public logout() {
    return this.http.post('/logout', {});
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();
