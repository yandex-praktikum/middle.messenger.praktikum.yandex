export const template = `
<form action="javascript:void(0);">
    {{{title}}}
    {{{avatar}}}
    {{#each inputs}}
        {{{this}}}
    {{/each}}
    {{{info}}}
    {{{button}}}
    {{{link}}}
</form>
`
