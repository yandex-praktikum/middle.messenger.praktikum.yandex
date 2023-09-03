// language=hbs
export default `
    <main class='wrapper wrapper_max wrapper_max'>
        {{> 'ChatsPanel' }}
        {{> 'ChatSpace' }}
        {{# if showCreateChatModal }}
            {{> 'Modal'
                title='Создать чат'
                buttonTitle='Создать'
                text='Введите название чата'
            }}
        {{ else }}
            {{# if showRemoveChatModal }}
                {{> 'Modal'
                    title='Удалить чат'
                    buttonTitle='Удалить'
                    text='Вы действительно хотите удалить историю сообщений?'
                }}
            {{/if}}
        {{/if}}
    </div>
`;
