import './Panel.scss';

// language=hbs
export default `
    <div class='chat-panel'>
        <div class='chat-panel__header'>
            {{> 'IconButton'
                    class='button_panel'
                    title='Создать чат'
                    icon='PenIcon'
                    iconClass='icon_blue'
            }}
            {{> 'TextInput'
                    class='input_chat input_search'
                    placeholder='Поиск'
                    value=search
                    name='search'
                    type='text'
            }}
            {{> 'IconButton'
                    class='button_panel'
                    title='Профиль'
                    icon='AngleRightIcon'
                    iconClass='icon_blue'
            }}
        </div>
        {{> 'ChatList' }}
    </div>
`;
