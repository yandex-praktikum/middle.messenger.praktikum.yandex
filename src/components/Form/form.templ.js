export const template = `
<div class="{{{styles.form-container}}}">
    <h2>{{{title}}}</h2>
    <form action="javascript:void(0);">
        {{#each inputs}}
            {{{this}}}
        {{/each}}
        {{{button}}}
        {{{link}}}
    </form>
</div>

`
