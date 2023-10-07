import { HTTPClient } from "@/shared/api";

const userAPIInstance = new HTTPClient("https://ya-praktikum.tech/api/v2/user");

class UserAPI {
  public async editUser(data: any) {
    return userAPIInstance.put("/profile", { data });
  }
}

export { UserAPI };
