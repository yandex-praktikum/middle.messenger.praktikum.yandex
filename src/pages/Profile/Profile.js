import './Profile.scss';

// language=hbs
export default `
    <main class='wrapper wrapper_max wrapper_profile'>
        {{> 'IconButton'
            class='button_chats'
            title='Чаты'
            icon='AngleLeftIcon'
            iconClass='icon_blue'
        }}
        <form class='profile'>
            {{> 'ProfileHeader' }}
            {{> 'ProfileBody' }}
            {{> 'ProfileFooter' }}
        </form>
        {{# if exit }}
            {{> 'Modal'
                title='Выход'
                buttonTitle='Выйти'
                text='Вы действительно хотите выйти из профиля?'
            }}
        {{/ if }}
    </main>
`;
