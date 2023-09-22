import Handlebars from "handlebars";
import { AuthForm } from "@/entities/auth";

function registerPartials() {
  Handlebars.registerPartial("AuthForm", AuthForm());
}
export { registerPartials };
