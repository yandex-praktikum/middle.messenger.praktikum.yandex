import Handlebars from 'handlebars';

export default function showNewMessageCount(newMessageCount) {
  if (newMessageCount > 0) {
    return new Handlebars.SafeString("<div class='chat__item-count'>" + newMessageCount + "</div>");
  } else {
    return '';
  }
}
