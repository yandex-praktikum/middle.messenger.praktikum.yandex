export const template = `
<div class="avatar-container {{#if selected}}blue{{else}}''{{/if}}">
    <img class="avatar" src="{{ avatar }}" alt="avatar" title="{{ display_name }}">
    <span class="name">{{ display_name }}</span>
    {{#if (notEqual n 0)}}
        <div class="new-count">
            <span>{{newCount}}</span>
        </div>
    {{/if}}
    <div class="message-text">
        <p><span>{{{author}}}: </span> <span> {{{message}}} </span></p>
    </div>
    <p class="align-right date">{{ date }}</p>
</div>
`
