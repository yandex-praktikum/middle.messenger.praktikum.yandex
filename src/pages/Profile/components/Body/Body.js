import './Body.scss';

// language=hbs
export default `
    <div class='body'>
        {{# if editPassword }}
            {{> 'ProfileItem'
                label='Старый пароль'
                placeholder='Старый пароль'
                name='old_password'
                type='password'
            }}
            {{> 'ProfileItem'
                label='Новый пароль'
                placeholder='Новый пароль'
                name='new_password'
                type='password'
            }}
            {{> 'ProfileItem'
                label='Новый пароль (повторно)'
                placeholder='Новый пароль'
                name='new_password_repeat'
                type='password'
            }}
        {{ else }}
            {{> 'ProfileItem'
                label='Почта'
                value=user.email
                name='email'
                type='email'
            }}
            {{> 'ProfileItem'
                label='Логин'
                value=user.login
                name='login'
                type='text'
            }}
            {{> 'ProfileItem'
                label='Имя'
                value=user.first_name
                name='first_name'
                type='text'
            }}
            {{> 'ProfileItem'
                label='Фамилия'
                value=user.second_name
                name='second_name'
                type='text'
            }}
            {{> 'ProfileItem'
                label='Имя в чате'
                value=user.display_name
                name='display_name'
                type='text'
            }}
            {{> 'ProfileItem'
                label='Телефон'
                value=user.phone
                name='phone'
                type='phone'
            }}
        {{/if}}
    </div>
`;
