export const template = `
<div class='profile__container'>
    <div class='profile'>
         <a href="/chats" class='profile__close'>
            <img src="{{iconClose}}" alt="">
         </a>
        <h1 class='profile__title'>
            Настройки профиля
        </h1>
        <form class='profile__form form'>
        <div class="profile__avatar">{{{inputAvatar}}}</div>
            <div class='profile__inputs'>
                {{{inputs}}}
            </div>
            <div class='profile__submit'>
                {{{button}}}
            </div>
        </form>
        <a href="/login" class='profile__log-out'>
            {{{buttonLogOut}}}
        </a>
    </div>
</div>
`;