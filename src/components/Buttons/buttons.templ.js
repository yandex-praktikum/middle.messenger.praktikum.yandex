export const template = `
<button class="{{{styles.button-submit}}} {{#each class}} {{{this}}} {{/each}}"
    {{#if disabled}} {{{styles.disabled}}} {{/if}}
    type="{{type}}" 
    {{#if disabled}} disabled {{/if}}>
    {{ label }}
</button>
`

export const templateAwesome = `
<button class="{{{styles.button-awesome}}}
    {{#each class}} {{{this}}} {{/each}}"
    type="{{{type}}}" 
    >
    <i class="{{{icon}}}" aria-hidden="true" title="{{{title}}}" ></i>
</button>
`
