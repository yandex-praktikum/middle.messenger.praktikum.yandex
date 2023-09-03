import './Buttons.scss';

// language=hbs
export default `
    <button class='button button_icon {{ class }}'>
        {{ getIcon icon iconClass }}
        {{# if text }}
            <span class='button__title'>{{ text }}</span>
        {{/if}}
    </button>
`;
