
import Handlebars from 'handlebars';

export const avatarContainerTemplate = ({avatar, display_name, selected, n}) => Handlebars.compile(`
<div class="avatar-container {{#if selected}}blue{{else}}''{{/if}}">
    <img class="avatar" src="{{ avatar }}" alt="avatar" title="{{ display_name }}">
    <span class="name">{{ display_name }}</span>
    {{#if (notEqual n 0)}}
        <div class="new-count">
            <span>{{n}}</span>
        </div>
    {{/if}}
</div>
`)({avatar, display_name, selected, n})
