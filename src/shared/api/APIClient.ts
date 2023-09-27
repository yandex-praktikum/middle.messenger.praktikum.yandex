import { HTTPClient } from "./HTTPClient";

class APIClient {
  private readonly HTTPClient: HTTPClient = new HTTPClient();
  private base: string;

  constructor(base: string) {
    this.base = base;
  }
}

export { APIClient };
