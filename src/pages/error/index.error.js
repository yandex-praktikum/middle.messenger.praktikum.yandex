import Handlebars from "handlebars";
import { template } from "./error.tmpl.js";


export const showError = (errorType='404') =>{ 
  console.log(errorType)
  let error = {
    error: "404",
    message: "There is nothing here...",
    returnMessage: "Take me back...",
  };
  if (errorType == 'server'){
    error = {
      error: "Server Error!",
      message: "Something went wrong...",
      returnMessage: "try to take me back...",
    };
  }
  return Handlebars.compile(template)(error)
};
