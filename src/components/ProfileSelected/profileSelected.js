import './profileSelected.scss';

export default `
    <div class="profile {{#if selected}}selected{{/if}}" id="profile" data-id="{{ id }}">
        <div class="profile__image">
            <img src="{{ imgSrc }}" alt="Аватар">
        </div>
        <div class="profile__info">
            <div class="profile__info-name">{{ first_name }}</div>
            <div class="profile__info-login">{{ login }}</div>
        </div>
        <div class="profile__arrow">
            <img src="/img/arrow.svg" alt="Перейти">
        </div>
    </div>
`;
