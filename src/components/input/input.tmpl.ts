const input = `
<input
    {{#if idInput}}
        id="{{idInput}}"
    {{/if}}

    {{#if classInput}}
        class="{{classInput}}"
    {{/if}}

    type="{{typeInput}}"

    name="{{nameInput}}"

    {{#if placeHolder}}
        placeholder="{{placeHolder}}"
    {{/if}}

    {{#if valueInput}}
        value="{{valueInput}}"
    {{/if}}
    
    {{#if readonly}}
        readonly
    {{/if}}

    {{#if hidden}}
        hidden
    {{/if}}

    {{#if autocomplete}}
        autocomplete="{{autocomplete}}"
    {{/if}}
>
</input>
`;

export { input };
