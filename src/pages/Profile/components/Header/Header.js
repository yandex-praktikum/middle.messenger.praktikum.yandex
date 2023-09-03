import './Header.scss';

// language=hbs
export default `
    <div class='header header_profile'>
          {{> 'ImageInput'
              avatar=user.avatar
              withAddIcon=editProfile
              withRemoveIcon=(and editProfile user.avatar)
          }}
        <p class='header__title'>{{ user.display_name }}</p>
    </div>
`;
