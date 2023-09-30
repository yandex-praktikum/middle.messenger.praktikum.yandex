export const tmpl = `
  <section class="chatting">
    <div class="chatting__content">
      <aside class="chatting__aside">
        <div class="chatting__aside-header">
          <div class="chatting__aside-profile">
            <a href="/profile">
              <p class="chatting__aside-profile-text">Профиль</p>
            </a>
          </div>
          <input class="chatting__search" type="text" placeholder="Поиск" />
        </div>

        <div class="chatting__chats">
          <div class="chatting__chat">
            <img
              class="chatting__chat-avatar"
              src="{{avatar}}"
              alt="Аватар"
              width="47"
              height="47"
            />
            <div class="chatting__chat-preview">
              <p class="chatting__chat-name">Андрей</p>
              <p class="chatting__chat-message">Изображение</p>
            </div>
            <div class="chatting__chat-info">
              <time class="chatting__chat-time">10:49</time>
              <div class="chatting__chat-count-message">5</div>
            </div>
          </div>

          <div class="chatting__chat">
            <img
              class="chatting__chat-avatar"
              src="{{avatar}}"
              alt="Аватар"
              width="47"
              height="47"
            />
            <div class="chatting__chat-preview">
              <p class="chatting__chat-name">Андрей</p>
              <p class="chatting__chat-message">Изображение</p>
            </div>
            <div class="chatting__chat-info">
              <time class="chatting__chat-time">10:49</time>
              <div class="chatting__chat-count-message">5</div>
            </div>
          </div>

          <div class="chatting__chat">
            <img
              class="chatting__chat-avatar"
              src="{{avatar}}"
              alt="Аватар"
              width="47"
              height="47"
            />
            <div class="chatting__chat-preview">
              <p class="chatting__chat-name">Андрей</p>
              <p class="chatting__chat-message">Изображение</p>
            </div>
            <div class="chatting__chat-info">
              <time class="chatting__chat-time">10:49</time>
              <div class="chatting__chat-count-message">5</div>
            </div>
          </div>
        </div>
      </aside>

      <div class="chatting__dialog-window">
        <div class="chatting__dialog-header">
          <div class="chatting__dialog-user-info">
            <img class="chatting__dialog-user-avatar" src="{{avatar}}" alt="Аватар" />
            <p class="chatting__dialog-user-name">Вадим</p>
          </div>
          <button class="chatting__dialog-more-button"></button>
        </div>
        <div></div>
        <div class="chatting__dialog-control">
          <label class="chatting__dialog-file" for="fileLoad">
            <input id="fileLoad" type="file" />
          </label>

          <input class="chatting__dialog-input-text" type="text" placeholder="Сообщение" />

          <button class="chatting__dialog-send-message"></button>
        </div>
      </div>
    </div>
  </section>
`;
