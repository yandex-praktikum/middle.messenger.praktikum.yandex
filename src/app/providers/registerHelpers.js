import Handlebars from "handlebars/runtime";

function registerHelpers() {
  Handlebars.registerHelper("getJsonContext", function (data, options) {
    try {
      const context = options.fn(JSON.parse(data));
      return context;
    } catch (error) {
      console.error(error);
      return;
    }
  });
}

export { registerHelpers };
