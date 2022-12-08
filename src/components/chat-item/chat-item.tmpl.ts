const chatItem = `
<li class="user__item {{#if unreadCount}}user__item_unreaded{{/if}}">
     <div class="user__avatar-block">
         <img src={{{avatar}}} alt="Avatar" class="user__avatar">
     </div>
     <div class="user__main">
         <div class="user__name">{{{author}}}</div>
         <div class="user__msg">{{{message}}}</div>
     </div>
     <div class="user__msg-info">
         <time class="user__time">{{time}}</time>
         <div class="user__msg-unreaded">
            <span class="user__msg-unreaded-value">
                {{#if unreadCount}}
                    {{{unreadCount}}}
                {{/if}}
            </span>
         </div>
     </div>
 </li>`;

export { chatItem };
