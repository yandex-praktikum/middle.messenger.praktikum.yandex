import app from "@/app";
import { Router, Store } from "./shared/model";
import { AppState } from "./app/providers/withStore";

app();

declare global {
  interface Window {
    router: Router;
    store: Store<AppState>;
  }
}
