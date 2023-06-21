export const template = `
<div class="container">
    <div class="form-container">
        <h2>Login</h2>
        <form action="javascript:void(0);">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            {{{button}}}
            {{{link}}}
        </form>
    </div>
</div>
`
