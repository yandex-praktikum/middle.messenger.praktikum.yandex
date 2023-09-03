import './Header.scss';

// language=hbs
export default `
    <div class='header header_chat'>
        <div class='chat-info'>
            {{> 'Avatar'
                    avatar=avatar
                    avatarClass='avatar_mini'
            }}
            <div class='chat-info__data'>
                <div class='chat-info__title'>{{ title }}</div>
                {{# if members }}
                    <div class='chat-info__members-count'>{{ getMembers members }}</div>
                {{/ if }}
            </div>
        </div>
        {{> 'IconButton'
            class='chat-space__menu'
            title='Настройки'
            icon='EllipsisIcon'
            iconClass='icon_blue'
        }}
        {{# if showMembers }}
            {{> 'MembersModal' }}
        {{/ if }}
    </div>
`;
