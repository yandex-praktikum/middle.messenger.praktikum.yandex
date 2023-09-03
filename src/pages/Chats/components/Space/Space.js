import './Space.scss';

// language=hbs
export default `
    <div class='chat-space {{# if isAnyChatOpen }}chat-space_with-chat{{ else }}chat-space_without-chat{{/ if }}'>
        {{# if open_chat_id }}
            {{> 'Chat'
                members=(countMembers users)
                avatar=(getChatAvatar open_chat_id)
                title=(getChatTitle open_chat_id)
                messageGroups=(getGroupMessagesByDate chat)
                messageGroupsOrder=(messageGroupsOrder (getGroupMessagesByDate chat))
            }}
        {{ else }}
            {{> 'WithoutChat' }}
        {{/ if }}
    </div>
`;
