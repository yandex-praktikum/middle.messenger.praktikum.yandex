import { APIClient } from "@/shared/api/APIClient";

class SigninAPI extends APIClient {
  public request() {
    this.HTTPClient.get();
  }
}
