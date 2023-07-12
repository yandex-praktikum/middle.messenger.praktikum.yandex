export const template = `
<{{{tag}}} 
    {{#if name}} name="{{{name}}}" {{/if}}
    {{#if for}} name="{{{for}}}" {{/if}}
    class="{{#each class}} {{{this}}} {{/each}}"}>
    {{{content}}}
</{{{tag}}}>
`
