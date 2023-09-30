export const tmpl = `
    <ul class="navbar">
        {{#each tmplLinks}}
            <li>
                {{{ this }}}
            </li>
        {{/each}}
    </ul>
`;
