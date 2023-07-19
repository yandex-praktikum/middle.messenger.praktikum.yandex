export const template = `
<main>
    {{{editChatPopup}}}
    {{{createNewChatPopup}}}
    {{{addUserPopup}}}
    {{{removeUserPopup}}}
    <div class="{{{styles.panel}}} {{{styles.left-panel}}}">
        {{{search}}}
        {{{chats}}}
    </div>

    <div class="{{{styles.panel}}} {{{styles.right-panel}}}">
        {{{topChat}}}
        {{{messages}}}
        <div class="{{{styles.spacer}}}"></div>
        {{{sendMessage}}}
    </div>
</main>
`;
