import BaseAPI from './BaseAPI';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async signin(data: SigninData): Promise<null> {
    return this.http.post('/signin', data);
  }

  async signup(data: SignupData): Promise<{ id: number }> {
    return this.http.post('/signup', data);
  }

  async read(): Promise<User> {
    return this.http.get('/user');
  }

  async logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();
