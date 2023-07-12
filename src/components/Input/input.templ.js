export const template = `
<input {{#if id}} id="{{{id}}}" {{/if}} class="{{#each class}} {{{this}}} {{/each}}" name="{{ name }}" type="{{ type }}" placeholder="{{placeholder}}" value="{{{value}}}"/>
`
