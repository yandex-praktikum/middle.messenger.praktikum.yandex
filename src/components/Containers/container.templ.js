export const templateBlank = `
<div></div>
`;

export const templateContainer = `
<div class="{{#each class}} {{{this}}} {{/each}}" >
    {{#each content}}
        {{{this}}}
    {{/each}}
</div>
`;

export const templateScroller = `
<div class="{{{styles.scroller-container}}}">
    <div class="{{{styles.scroller}}}">
        {{#each content}}
            {{{this}}}
        {{/each}}
    </div>
</div>
`;

export const templateMessagesHeader = `
<div class="{{{styles.messages-header-container}}}" >
    <div class="{{{styles.avatar-container}}} {{#if selected}}{{{styles.blue}}}{{else}}''{{/if}}">
        {{{avatar}}}
        <span class="{{{styles.name}}}">{{ title }}</span>
    </div>
    {{{buttonAddUser}}}
    {{{buttonDeleteChat}}}
</div>
`;

export const templateLm = `
<div class="{{{styles.message-container-reply}}}">
    {{{avatar}}}
    <div class="{{{styles.message-content}}}">
        <p class="{{{styles.author}}}">{{author}}</p>
        <p class="{{{styles.message-text}}}">{{ message }}</p>
        <p class="{{{styles.date}}}">{{ date }}</p>
    </div>
</div>
`;
export const templateRm = `
<div class="{{{styles.message-container-you}}}">
    <div class="{{{styles.message-content}}}">
        <p class="{{{styles.author}}}">{{ author }}</p>
        <p class="{{{styles.message-text}}}">{{ message }}</p>
        <p class="{{{styles.date}}}">{{ date }}</p>
    </div>
    {{{avatar}}}
</div>
`;

export const templateSendMessage = `
<div class="{{{styles.send-message-container}}}">
    <div class="{{{styles.send-message-content}}}">
            {{{button-attachment}}}
            {{{button-image}}}
            {{{textarea}}}
            {{{button-send}}}
    </div>
</div>
`;
