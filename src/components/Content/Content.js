import './Content.scss';

// language=hbs
export default `
    <div class='content'>
        <div class='content__title{{# if search }} content__title_search{{/ if }}'>{{ title }}</div>
        {{# unless search }}
            <p class='content__text'>
                {{# if (isCurrentUser email) }}
                    <span class='content__author'>Вы: </span>
                {{ else }}
                    <span class='content__author'>{{ from }}: </span>
                {{/ if }}
                {{ content }}
            </p>
        {{/ unless }}
    </div>
`;
