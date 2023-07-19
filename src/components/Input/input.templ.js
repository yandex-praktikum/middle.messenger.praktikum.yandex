export const template = `
<input 
{{#if id}} id="{{{id}}}" {{/if}} 
class="{{#each class}} {{{this}}} {{/each}}" 
{{#if name}} name="{{{name}}}" {{/if}} 
{{#if accept}} accept="{{{accept}}}" {{/if}} 
type="{{ type }}" 
placeholder="{{placeholder}}" 
value="{{{value}}}
"/>
`;
