const handlebars = require('handlebars');

module.exports = function (source) {
  return handlebars.compile(source);
};
