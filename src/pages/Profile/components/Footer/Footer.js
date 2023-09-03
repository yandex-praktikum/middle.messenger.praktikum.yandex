import './Footer.scss';

// language=hbs
export default `
    <div class='footer footer_profile {{# if (or editProfile editPassword) }}edit{{/if}}'>
        {{# if (or editProfile editPassword) }}
            {{> 'PrimaryButton' title='Сохранить' class='max-width' }}
            {{> 'LinkButton' title='Отменить' class='max-width' }}
        {{ else }}
            {{> 'IconButton'
                class='footer__button'
                title='Изменить данные'
                icon='PencilIcon'
                iconClass='icon_blue icon_large'
            }}
            {{> 'IconButton'
                class='footer__button'
                title='Изменить пароль'
                icon='LockIcon'
                iconClass='icon_blue icon_large'
            }}
            {{> 'IconButton'
                class='footer__button'
                title='Изменить данные'
                icon='ExitIcon'
                iconClass='icon_blue icon_large'
            }}
        {{/if}}
    </div>
`;
