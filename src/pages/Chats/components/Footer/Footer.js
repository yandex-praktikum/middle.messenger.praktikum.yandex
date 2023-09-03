import './Footer.scss';

// language=hbs
export default `
    <div class='footer footer_chat'>
        {{> 'IconButton'
            class='chat-space__file'
            icon='PaperclipIcon'
            iconClass='icon_blue icon_large'
        }}
        {{# if showFilesMenu }}
            {{> 'FilesMenu' }}
        {{/ if }}
        {{> 'TextInput'
            class='input_chat input_message'
            placeholder='Сообщение'
            name='message'
            type='text'
        }}
        {{> 'IconButton'
            class='chat-space__button'
            icon='SearchIcon'
            iconClass='icon_light'
        }}
    </div>
`;
