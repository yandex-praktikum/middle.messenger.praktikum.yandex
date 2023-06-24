export const template = `
<input class="{{#each class}} {{{this}}} {{/each}}" value="{{{value}}}" name="{{ name }}" type="{{ type }}" placeholder="{{placeholder}}"/>
`
