export const template = `
<button class="{{{styles.button-submit}}} {{#each class}} {{{this}}} {{/each}}" type="{{type}}">
    {{ label }}
</button>
`

export const templateAwesome = `
<button class="{{{styles.button-awesome}}} {{#each class}} {{{this}}} {{/each}}">
    <i class="{{{icon}}}" aria-hidden="true" title="{{{title}}}" ></i>
</button>
`
