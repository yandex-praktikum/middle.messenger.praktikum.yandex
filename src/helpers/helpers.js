var handlebars = require('handlebars');
handlebars.registerHelper('isBuddyRow',(sender) => {
    return sender !== "You" ? 'buddy_row' : 'mine_row'; 
})
handlebars.registerHelper('isBuddyMessage',(sender) => {
    return sender !== "You" ? 'buddy_message' : 'mine_message'; 
})
handlebars.registerHelper('isDelivered',(delivered) => {
    return delivered ? 'delivered' : 'undelivered'; 
})
handlebars.registerHelper('brief', function (messageText) {
    if(messageText.length > 5) {
      return `${messageText.slice(0,5)}...`;
    }
    return messageText;
  })
var helpers = require('handlebars-helpers')({
  handlebars: handlebars
});
