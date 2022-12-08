const button = `

{{#if href}}
    <a href="{{href}}" class="{{class}}">{{text}}</a>
{{else}}
<button
    {{#if id}}
        id="{{id}}"
    {{/if}}
    class="{{class}}"
    {{#if type}}
        type="{{type}}"
    {{/if}}
>
    {{#if nameInput}}
        <label for="{{nameInput}}">{{text}}</label>
    {{else}}
    {{{text}}}
{{/if}}
</button>
{{/if}}
`;

export { button };
