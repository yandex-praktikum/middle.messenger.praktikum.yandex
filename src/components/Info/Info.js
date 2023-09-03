import './Info.scss';

// language=hbs
export default `
    <div class='info'>
        {{# unless search }}
            <div class='info__time'>{{ showChatTime time }}</div>
        {{/ unless }}
        {{# if unread_count }}
            <div class='info__new-messages{{# if search }} info__new-messages_search{{/ if }}'>{{ unread_count }}</div>
        {{/ if }}
    </div>
`;
