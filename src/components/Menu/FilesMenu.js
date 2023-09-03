import './Menu.scss';

// language=hbs
export default `
  <div class='menu menu_files'>
      <div class='menu__item'>
          {{> 'ImageIcon' class='icon_blue' }}
          <span class='menu__title'>Фото или видео</span>
      </div>
      <div class='menu__item'>
          {{> 'FileIcon' class='icon_blue' }}
          <span class='menu__title'>Файл</span>
      </div>
      <div class='menu__item'>
          {{> 'LocationIcon' class='icon_blue' }}
          <span class='menu__title'>Локация</span>
      </div>
  </div>
`;
