export const template = `
<main>
    <div class="{{{styles.panel}}} {{{styles.left-panel}}}">
        {{{search}}}
        {{{createNewChatPopup}}}
        {{{chats}}}
    </div>

    <div class="{{{styles.panel}}} {{{styles.right-panel}}}">
        {{{topChat}}}
        {{{messages}}}
        <div class="{{{styles.spacer}}}"></div>
        {{{sendMessage}}}
    </div>
</main>
`
