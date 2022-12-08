const activeChat = `
<div 
class="messages__item 
{{#if isMine}}
    messages__user 
    {{#if readed}}
        messages__user_readed  
    {{else}}
        messages__user_unreaded
    {{/if}}
{{else}}
    messages__friend
{{/if}}">
    <div class="messages__text">
        {{text}}
    </div>
    {{#if image}}
        <img src={{{image}}} alt="image" class="messages__image">
    {{/if}}
    <time class="messages__date">
        {{time}}
     </time>
 </div>
 `;

export { activeChat };
