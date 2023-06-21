export const template = `
<div class="{{{styles.avatar-container}}} {{#if selected}}blue{{else}}''{{/if}}">
    <img class="{{{styles.avatar}}}" src="{{ avatar }}" alt="avatar" title="{{ display_name }}">
    <span class="{{{styles.name}}}">{{ display_name }}</span>
    {{#if (notEqual n 0)}}
        <div class="{{{styles.new-count}}}">
            <span>{{newCount}}</span>
        </div>
    {{/if}}
    <div class="{{{styles.message-text}}}">
        <p><span>{{{author}}}: </span> <span> {{{message}}} </span></p>
    </div>
    <p class="{{{styles.align-right}}} {{{styles.date}}}">{{ date }}</p>
</div>
`
