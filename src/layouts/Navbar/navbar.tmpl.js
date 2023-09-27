export const tmpl = `
    <ul>
        {{#each tmplLinks}}
            <li>
                {{{ this }}}
            </li>
        {{/each}}
    </ul>
`
