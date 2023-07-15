export const template = `
    <div class='chats'>
        <header class='chats__header'>
            <div class='chats__logo'>
                <img src='{{logoUrl}}' alt='logo'>
                <span>E-Message</span>
            </div>
            <div class='chats__selected-info'>
                <div class='chats__selected-name'>{{{chatName}}}</div>
                <div class='chats__selected-count'>{{{chatParticipantsCount}}}</div>
            </div>
            <div class='chats__profile'>
                <a href="/profile" class='chats__profile-setting'>
                    <img src='{{settingUrl}}' alt="">
                </a>
                <div class='chats__profile-avatar'>
                    {{{avatar}}}
                </div>
            </div>
        </header>
        <main class="chats__main">
            <section class='chats__left'>
                <div class='chats__search'>
                    {{{inputSearch}}}
                </div>
                <div class='chats__list'>
                    {{{chats}}}
               </div>
            </section>
            <section class='chats__right'>
                <p>Выберите чат чтобы отправить сообщение</p>
            </section>
        </main>
    </div>
`;