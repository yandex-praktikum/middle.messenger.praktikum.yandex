import './Error.scss';

// language=hbs
export default `
    <main class='wrapper wrapper_max wrapper_error'>
        <h1 class='error__code'>{{ code }}</h1>
        {{# if handIcon }}
            {{> 'HandIcon' class='icon_blue icon_big' }}
        {{ else }}
            {{> 'OtterIcon' class='icon_blue icon_big' }}
        {{/if}}
        <p class='error__message'>{{ message }}</p>
        {{> 'IconButton'
            class='back-button'
            icon='LeftArrowIcon'
            iconClass='icon_blue'
            text='Вернуться на главную'
        }}
    </div>
`;
