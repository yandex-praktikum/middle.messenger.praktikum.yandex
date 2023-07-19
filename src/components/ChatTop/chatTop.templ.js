export const template = `
<div class="{{{styles.messages-header-container}}}
    {{#unless selected}}
        {{{styles.hidden}}}
    {{/unless}}
" >
    {{{avatarContainer}}}
    {{{addUserButton}}}
    {{{removeUserButton}}}
    {{{editChatButton}}}
    {{{deleteChatButton}}}
</div>
`;
