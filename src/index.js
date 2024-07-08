import Handlebars from "handlebars";
import signin from './pages/signin/signin.hbs'

const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));
