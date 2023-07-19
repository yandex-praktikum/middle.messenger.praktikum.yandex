import Handlebars from 'handlebars';

export const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper('ifCond', function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('larger', function (v1, v2) {
    if (v1 > v2) {
      return true;
    }
    return false;
  });
  Handlebars.registerHelper('smaller', function (v1, v2) {
    if (v1 < v2) {
      return true;
    }
    return false;
  });
  Handlebars.registerHelper('equal', function (v1, v2) {
    if (v1 === v2) {
      return true;
    }
    return false;
  });
  Handlebars.registerHelper('notEqual', function (v1, v2) {
    if (v1 !== v2) {
      return true;
    }
    return false;
  });
};
