const chatHeader = `
<div class="chat-main__title chat-header">
    <div class="chat-header__profile">
        <div class="chat-header__avatar-block">
            <img src="{{srcAvatar}}" alt="Avatar" class="chat-header__avatar">
        </div>
        <div class="chat-header__name">{{userName}}</div>
    </div>
    <div class="chat-header__utils">
       {{{dropDownButton}}}
    </div>
    <div class="chat-header__modal-menu chat-header__modal-menu_hidden modal-menu">
  <div class="modal-menu__inner">
    <div class="modal-menu__item">
      <button class="modal-menu__text" type="button">
        <label for="add-user-chat">Добавить пользователя</label>
      </button>
    </div>
    <div class="modal-menu__item">
      <button class="modal-menu__text" type="button">
        <label for="delete-user-chat">Удалить пользователя</label>
      </button>
    </div>
    <div class="modal-menu__item">
      <button class="modal-menu__text" type="button">
        <label for="delete-chat">Удалить чат</label>
      </button>
    </div>
  </div>
</div>
</div>
`;

export { chatHeader };
