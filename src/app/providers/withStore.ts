import { User } from "@/shared/api/user";
import { Store } from "@/shared/model";

type AppState = {
  user: null | User;
};

const initialState: AppState = {
  user: null,
};

function withStore() {
  window.store = new Store<AppState>(initialState);
}

export { withStore };
export type { AppState };
