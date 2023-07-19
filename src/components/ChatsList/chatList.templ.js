export const template = `
<div class="{{{styles.scroller-container}}}">
    <div class="{{{styles.scroller}}}">
        {{#each chats}}
            {{{this}}}
        {{/each}}
    </div>
</div>`;
