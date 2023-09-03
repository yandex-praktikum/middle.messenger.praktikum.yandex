import './Message.scss';

// language=hbs
export default `
    <div class='message message_{{ messageClass outgoing }}'>
        {{# unless outgoing }}
            <div class='message__author'>{{ author }}</div>
        {{/ unless }}
        <div class='message__content {{ messageClass outgoing }}'>
            {{ content }}
            {{# if img }}
                <img src='{{ createHref img }}' alt='Изображение' class='message__image'/>
            {{/if}}
            <div class='message__time'>{{ showMessageTime time }}</div>
        </div>
    </div>
`;
