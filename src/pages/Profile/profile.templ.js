export const template = `
<div class="container">
        <div class="panel right-panel">
            <div class="tools-container">
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="profile">
                {{{avatar}}}
                <div class="profile-details">
                    {{#each details}}
                        {{{this}}}
                    {{/each}}
                </div>
            </div>
        </div>
    </div>
`

export const detailTemplate = `
<div class="detail">
    <strong>{{{label}}}:</strong> <span>{{{value}}}</span>
</div>
`
