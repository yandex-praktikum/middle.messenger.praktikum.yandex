import * as Components from "@/shared/ui";
import { registerComponent } from "@/shared/lib";

function registerComponents(): void {
  registerComponent("Button", Components.Button);
  registerComponent("Input", Components.Input);
  registerComponent("ErrorLine", Components.ErrorLine);
}

export { registerComponents };
