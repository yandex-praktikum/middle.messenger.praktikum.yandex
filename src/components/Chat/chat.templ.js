export const template = `
<div class="{{{styles.chat-container}}}" >
    <div class="{{{styles.avatar-container}}} {{#if selected}}{{{styles.blue}}}{{else}}''{{/if}}">
        {{{avatar}}}
        {{{title}}}
        {{#if (notEqual chat.unread_count 0)}}
            <div class="{{{styles.new-count}}}">
                <span>{{chat.unread_count}}</span>
            </div>
        {{/if}}
    </div>
    <div class="{{{styles.message}}}">
        {{{message}}}
    </div>
    <p class="{{{styles.date}}}">{{ date }}</p>
</div>
`;
