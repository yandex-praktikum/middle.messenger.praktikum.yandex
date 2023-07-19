export const template = `
<main>
    {{{tools}}}
    <div class="{{{styles.profile}}}">
        {{{avatar}}}
        <div>
            {{#each details}}
                {{{this}}}
            {{/each}}
        </div>
    </div>
</main>
`;

export const detailTemplate = `
<div class="{{{styles.detail}}}">
    <strong>{{{label}}}:</strong> <span>{{{value}}}</span>
</div>
`;
