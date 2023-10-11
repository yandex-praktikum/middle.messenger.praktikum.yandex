import { HTTPClient } from "@/shared/api";

const userAPIInstance = new HTTPClient("/user");

class UserAPI {
  public async editUser(data: any) {
    return userAPIInstance.put("/profile", { data });
  }

  public async editAvatar(data: FormData) {
    const response: any = await userAPIInstance.put("/profile/avatar", {
      data,
    });
    if (response.id) {
      window.store.set({ user: response });
    }
  }
}

export { UserAPI };
