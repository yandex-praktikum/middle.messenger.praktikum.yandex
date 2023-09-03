import './Menu.scss';

// language=hbs
export default `
  <div class='menu menu_members'>
      <div class='menu__item'>
          {{> 'PhotoIcon' class='icon_blue' }}
          <span class='menu__title'>Изменить аватар чата</span>
      </div>
      <div class='menu__item'>
          {{> 'TrashIcon' class='icon_blue' }}
          <span class='menu__title'>Удалить историю сообщений</span>
      </div>
  </div>
`;
