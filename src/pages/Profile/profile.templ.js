export const template = `
<div class="container">
        <div class="{{{styles.panel}}} {{{styles.right-panel}}}">
            <div class="{{{styles.tools-container}}}">
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="{{{styles.profile}}}">
                {{{avatar}}}
                <div>
                    {{#each details}}
                        {{{this}}}
                    {{/each}}
                </div>
            </div>
        </div>
    </div>
`

export const detailTemplate = `
<div class="{{{styles.detail}}}">
    <strong>{{{label}}}:</strong> <span>{{{value}}}</span>
</div>
`
