export const template = `
<div class="container">
    <div class="panel left-panel">
        <div class="tools-container">
            <div class="search-container">
                {{{search}}}
                {{{button-search}}}
            </div>
            {{{button-profile}}}
        </div>
        <div class="scroller">
            <div class="scroller-container">
                {{{chats}}}
            </div>
        </div>
    </div>

    <div class="panel right-panel">
    {{#if noMessages}}
        <div class="tools-container">
            {{{button-settings}}}
        </div>
        <div class="no-messages">
            <p>Select a chat to see the messages</p>
        </div>
    {{else}}
        <div class="tools-container">
            {{{topAvatarContainer}}}
            {{{button-settings}}}
        </div>
        <div class="scroller">
            <div class="scroller-container">
                {{{messages}}}
            </div>      
        </div>
        <div class="spacer"></div>
        <div class="footer-right">
            <div class="tools-container">
                {{{button-attachment}}}
                {{{button-image}}}
            </div>
            <div class="send-message-container">
                <textarea name="message"></textarea>
                {{{button-send}}}
            </div>
        </div>
    {{/if}}
</div>
</div>
`
