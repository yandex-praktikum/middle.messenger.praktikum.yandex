export const template = `
<div class="{{{styles.messages-header-container}}}
    {{#unless selected}}
        {{{styles.hidden}}}
    {{/unless}}
" >
    {{{avatarContainer}}}
    {{{buttonAddUser}}}
    {{{buttonDeleteChat}}}
</div>
`
