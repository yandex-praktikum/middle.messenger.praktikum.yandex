import { HTTPClient } from "@/shared/api";

const userAPIInstance = new HTTPClient("/user");

class UserAPI {
  public async editUser(data: any) {
    return userAPIInstance.put("/profile", { data });
  }
}

export { UserAPI };
