import './Avatar.scss';

// language=hbs
export default `
    <div class='wrapper wrapper_avatar'>
        {{# if avatar }}
            <img src='{{ createHref avatar }}' alt='Аватар' class='avatar {{ avatarClass}}'/>
        {{ else }}
            {{# if user_avatar }}
                <img src='{{ createHref user_avatar }}' alt='Аватар' class='avatar {{ avatarClass}}'/>
            {{ else }}
                <img src={{ createHref 'user.png' }} alt='Без аватара' class='no-avatar  {{ avatarClass}}'/>
            {{/ if }}
        {{/ if }}
    </div>
`;
