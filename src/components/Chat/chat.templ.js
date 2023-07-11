export const template = `
<div class="{{{styles.chat-container}}}" >
    <div class="{{{styles.avatar-container}}} {{#if selected}}{{{styles.blue}}}{{else}}''{{/if}}">
        {{{avatar}}}
        <span class="{{{styles.name}}}">{{ title }}</span>
        {{#if (notEqual unread_count 0)}}
            <div class="{{{styles.new-count}}}">
                <span>{{unread_count}}</span>
            </div>
        {{/if}}
    </div>
    <div class="{{{styles.message-text}}}">
        <p><span>{{{author}}}: </span> <span> {{{message}}} </span></p>
    </div>
    <p class="{{{styles.date}}}">{{ date }}</p>
</div>
`
