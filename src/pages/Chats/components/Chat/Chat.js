import './Chat.scss';

// language=hbs
export default `
    <div class='chat-wrapper'>
        {{> 'ChatHeader'
            avatar=avatar
            title=title
            members=members
        }}
        <div class='chat-space__divider'></div>
        {{# if showMembersMenu }}
            {{> 'MembersMenu' }}
        {{/ if }}
        {{> 'ChatBody' }}
        <div class='chat-space__divider'></div>
        {{> 'ChatFooter' }}
        {{# if showAddUserModal }}
            {{> 'Modal'
                title='Добавить пользователя'
                buttonTitle='Добавить'
                label='Логин'
                inputName='add'
            }}
        {{ else }}
            {{# if showRemoveUserModal }}
                {{> 'Modal'
                    title='Удалить пользователя'
                    buttonTitle='Удалить'
                    text='Вы действительно хотите удалить пользователя из чата?'
                }}
            {{ else }}
                {{# if showAvatarLoadModal }}
                    {{> 'Modal'
                        title='Изменить аватар чата'
                        buttonTitle='Сохранить'
                        imgLoad=true
                        avatar=(getChatAvatar open_chat_id)
                        errorText='Ошибка, попробуйте еще раз'
                    }}
                {{/ if }}
            {{/ if }}
        {{/ if }}
    </div>
`;
