export const template = `
<div class="container">
<div class="panel left-panel">
    <div class="tools-container">
        <div class="search-container">
            <input class="search-input" type="text" placeholder="Search...">
            {{{buttons.search}}}
        </div>
        {{{buttons.profile}}}
    </div>
    <div class="scroller">
        <div class="scroller-container">
            {{{leftPaneChats}}}
        </div>
    </div>
</div>
<div class="panel right-panel">
    {{#if noMessages}}
        <div class="tools-container">
            {{{buttons.settings}}}
        </div>
        <div class="no-messages">
            <p>Select a chat to see the messages</p>
        </div>
    {{else}}
        <div class="tools-container">
            {{{topAvatarContainer}}}
            {{{buttons.settings}}}
        </div>
        <div class="scroller">
            <div class="scroller-container">
                {{{rightPanelMessages}}}
            </div>      
        </div>
        <div class="spacer"></div>
        <div class="footer-right">
            <div class="tools-container">
                {{{buttons.attachment}}}
                {{{buttons.image}}}
            </div>
            <div class="send-message-container">
                <textarea name="message"></textarea>
                {{{buttons.send}}}
            </div>
        </div>
    {{/if}}
</div>
</div>
`
