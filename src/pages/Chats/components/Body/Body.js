import './Body.scss';

// language=hbs
export default `
    <div class='body body_chat'>
        {{# each messageGroupsOrder }}
            <div class='chat__date'>{{ showDate this }}</div>
            {{# each (getMessagesAtDate ../messageGroups this) }}
                {{> 'Message'
                        content=this.content
                        time=this.time
                        outgoing=(isCurrentUser this.user.email)
                        author=this.user.display_name
                        img=this.img
                }}
            {{/ each }}
        {{/ each }}
    </div>
`;
