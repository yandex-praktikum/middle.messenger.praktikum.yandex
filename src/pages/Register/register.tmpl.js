export const template = `
<div class="container">
    <div class="form-container">
        <h2>Register</h2>
        <form action="javascript:void(0);">
            {{#each inputs}}
                {{{this}}}
                {{#ifCond @index 5}}
                    <hr>
                {{/ifCond}}
            {{/each}}
            {{{button}}}
            {{{link}}}
        </form>
    </div>
</div>
`
