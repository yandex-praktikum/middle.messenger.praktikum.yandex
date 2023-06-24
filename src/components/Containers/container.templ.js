export const templateBlank = `
<div></div>
`

export const templateContainer = `
<div class="{{#each class}} {{{this}}} {{/each}}" >
    {{#each content}}
        {{{this}}}
    {{/each}}
</div>
`

export const templateScroller = `
<div class="{{scrollerContainerClass}}" >
    <div class="{{scrollerClass}}" >
        {{#each content}}
            {{{this}}}
        {{/each}}
    </div>
</div>
`

export const templateChat = `
<div class="{{{styles.chat-container}}}" >
    <div class="{{{styles.avatar-container}}} {{#if selected}}{{{styles.blue}}}{{else}}''{{/if}}">
        {{{avatar}}}
        <span class="{{{styles.name}}}">{{ display_name }}</span>
        {{#if (notEqual newCount 0)}}
            <div class="{{{styles.new-count}}}">
                <span>{{newCount}}</span>
            </div>
        {{/if}}
    </div>
    <div class="{{{styles.message-text}}}">
        <p><span>{{{author}}}: </span> <span> {{{message}}} </span></p>
    </div>
    <p class="{{{styles.date}}}">{{ date }}</p>

</div>
`

export const templateMessagesHeader = `
<div class="{{{styles.messages-header-container}}}" >
    <div class="{{{styles.avatar-container}}} {{#if selected}}{{{styles.blue}}}{{else}}''{{/if}}">
        {{{avatar}}}
        <span class="{{{styles.name}}}">{{ display_name }}</span>
    </div>
    {{{button}}}
</div>
`

export const templateLm = `
<div class="{{{styles.message-container-reply}}}">
    <img class="{{#if hideAvatar}}{{{styles.hidden}}}{{else}}''{{/if}}" src="{{avatar}}" alt="avatar" title="{{author}}">
    <div class="{{{styles.message-content}}}">
        <p class="{{{styles.author}}}">{{author}}</p>
        <p class="{{{styles.message-text}}}">{{ message }}</p>
        <p class="{{{styles.date}}}">{{ date }}</p>
    </div>
</div>
`
export const templateRm = `
<div class="{{{styles.message-container-you}}}">
    <div class="{{{styles.message-content}}}">
        <p class="{{{styles.author}}}">{{ author }}</p>
        <p class="{{{styles.message-text}}}">{{ message }}</p>
        <p class="{{{styles.date}}}">{{ date }}</p>
    </div>
    <img class="{{#if hideAvatar}}{{{styles.hidden}}}{{else}}''{{/if}}" src="{{avatar}}" alt="avatar" title="{{author}}">
</div>
`

export const templateSendMessage = `
<div class="{{{styles.send-message-container}}}">
    <div class="{{{styles.spacer}}}"></div>
    <div class="{{{styles.send-message-content}}}">
            {{{button-attachment}}}
            {{{button-image}}}
            {{{textarea}}}
            {{{button-send}}}
    </div>
</div>
`
