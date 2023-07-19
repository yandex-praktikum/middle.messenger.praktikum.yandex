export const template = `
<{{{tag}}} 
    {{#if name}} name="{{{name}}}" {{/if}}
    {{#if for}} for="{{{for}}}" {{/if}}
    {{#if title}} title="{{{title}}}" {{/if}}
    {{#if src}} scr="{{{src}}}" {{/if}}
    {{#if class}} 
        class="{{{class}}}"
    {{/if}}>
    {{{content}}}
</{{{tag}}}>
`;
