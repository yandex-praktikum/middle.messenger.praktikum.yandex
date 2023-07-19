export const template = `
<textarea 
    class="{{#each class}} {{{this}}} {{/each}}" name="{{ name }}" 
    type="{{ type }}" 
    rows="{{{rows}}}" cols="{{{cols}}}"
    spellcheck="{{{spellcheck}}}"
    wrap="{{{wrap}}}"
    placeholder="{{{placeholder}}}"
></textarea>
`;
