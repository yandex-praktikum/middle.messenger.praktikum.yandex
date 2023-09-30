export const tmpl = `
    <nav class="navbar">
        <ul class="navbar__list">
            {{#each tmplLinks}}
                <li class="navbar__item">
                    {{{ this }}}
                </li>
            {{/each}}
        </ul>
    </nav>
`;
