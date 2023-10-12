import Handlebars from "handlebars";
import { AuthForm } from "@/entities/auth";
import { Modal } from "@/shared/ui";

function registerPartials() {
  Handlebars.registerPartial("AuthForm", AuthForm());
  Handlebars.registerPartial("Modal", Modal());
}

export { registerPartials };
