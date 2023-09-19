import * as Components from "@/shared/ui";
import { SigninForm, SignupForm } from "@/widgets/auth";
import { registerComponent } from "@/shared/lib";

function registerComponents(): void {
  registerComponent("Button", Components.Button);
  registerComponent("Input", Components.Input);
  registerComponent("ErrorLine", Components.ErrorLine);
  registerComponent("InputField", Components.InputField);
  registerComponent("SigninForm", SigninForm);
  registerComponent("SignupForm", SignupForm);
  registerComponent("SideButton", Components.SideButton);
}

export { registerComponents };
