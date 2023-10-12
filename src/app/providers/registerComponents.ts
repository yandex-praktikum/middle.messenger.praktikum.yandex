import * as Components from "@/shared/ui";
import { SigninForm, SignupForm } from "@/widgets/auth";
import { ChatList, ChatWindow, MessagesList } from "@/widgets/chat";
import { registerComponent } from "@/shared/lib";
import { ChatHeader, SearchChat, SendMessage } from "@/features/chat";
import { SettingsList } from "@/widgets/user";
import { ProfileList } from "@/widgets/user";

function registerComponents(): void {
  registerComponent("Button", Components.Button);
  registerComponent("Input", Components.Input);
  registerComponent("ErrorLine", Components.ErrorLine);
  registerComponent("InputField", Components.InputField);
  registerComponent("SigninForm", SigninForm);
  registerComponent("SignupForm", SignupForm);
  registerComponent("SideButton", Components.SideButton);
  registerComponent("UserImage", Components.UserImage);
  registerComponent("ListItem", Components.ListItem);
  registerComponent("InfoList", Components.InfoList);
  registerComponent("ChatCard", Components.ChatCard);
  registerComponent("ChatList", ChatList);
  registerComponent("SearchChat", SearchChat);
  registerComponent("ChatHeader", ChatHeader);
  registerComponent("ChatWindow", ChatWindow);
  registerComponent("SendMessage", SendMessage);
  registerComponent("IconButton", Components.IconButton);
  registerComponent("MessagesList", MessagesList);
  registerComponent("MessageCard", Components.MessageCard);
  registerComponent("SettingsList", SettingsList);
  registerComponent("ProfileList", ProfileList);
  registerComponent("Link", Components.Link);
}

export { registerComponents };
