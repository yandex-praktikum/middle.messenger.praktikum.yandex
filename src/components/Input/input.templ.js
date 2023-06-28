export const template = `
<input class="{{#each class}} {{{this}}} {{/each}}" name="{{ name }}" type="{{ type }}" placeholder="{{placeholder}}" value="{{{value}}}"/>
`
