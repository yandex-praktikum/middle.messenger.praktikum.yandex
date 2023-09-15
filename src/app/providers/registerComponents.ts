import * as Components from "@/shared/ui";
import { registerComponent } from "@/shared/lib";

function registerComponents(): void {
  registerComponent("Button", Components.Button);
}

export { registerComponents };
