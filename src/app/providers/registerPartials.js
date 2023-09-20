import Handlebars from "handlebars";
import modal from "@/shared/ui/modal/modal.hbs";
import textField from "@/shared/ui/textField/textField.hbs";
import basicLayout from "@/app/layouts/basicLayout.hbs";
import userImage from "@/shared/ui/userImage/userImage.hbs";
import infoList from "@/shared/ui/infoList/infoList.hbs";
import actionsList from "@/shared/ui/actionsList/actionsList.hbs";
import infoListEdit from "@/shared/ui/infoList/infoList.edit.hbs";
import { AuthForm } from "@/entities/auth";

function registerPartials() {
  Handlebars.registerPartial("modal", modal);
  Handlebars.registerPartial("textField", textField);
  Handlebars.registerPartial("layout", basicLayout);
  Handlebars.registerPartial("userImage", userImage);
  Handlebars.registerPartial("infoList", infoList);
  Handlebars.registerPartial("actionsList", actionsList);
  Handlebars.registerPartial("AuthForm", AuthForm());
}
export { registerPartials };
