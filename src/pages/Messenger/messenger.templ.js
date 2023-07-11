export const template = `
<main>
    <div class="{{{styles.panel}}} {{{styles.left-panel}}}">
        {{{search}}}
        {{{createNewChatPopup}}}
        {{{chats}}}
    </div>

    <div class="{{{styles.panel}}} {{{styles.right-panel}}}">
        {{{topChat}}}
        <div class="{{{styles.scroller-container}}}">
            <div class="{{{styles.scroller}}}">
                {{#each messages}}
                    {{{this}}}
                {{/each}}
            </div>
        </div>
        <div class="{{{styles.spacer}}}"></div>
        {{{sendMessage}}}
    </div>
</main>
`
