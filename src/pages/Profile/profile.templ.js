export const template = `
<main>
    <div class={{{style.container}}}
        {{{tools}}}
        <div class="{{{styles.profile}}}">
            {{{avatar}}}
            <div>
                {{#each details}}
                    {{{this}}}
                {{/each}}
            </div>
        </div>
    </div>
</main>
`

export const detailTemplate = `
<div class="{{{styles.detail}}}">
    <strong>{{{label}}}:</strong> <span>{{{value}}}</span>
</div>
`
