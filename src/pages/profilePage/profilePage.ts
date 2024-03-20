import { routes } from '../../constants/routes'
import Block from '../../core/Block'
import Avatar from '../../components/avatar/avatar'
import Link from "../../components/link/link";
import './profilePage.css'

// language=hbs
const ProfilePageTemplate = `
    <div class="profile">
        <div class="back">
            <button class="back__btn">
                <i class="lni lni-arrow-left"></i>
            </button>
        </div>

        <div class="profile-content">
            {{{ userAvatar }}}
            <span class="profile-content__username">{{ userdata.displayName }}</span>

            <div class="profile-info">
                <div class="profile-info-row">
                    <span class="profile-info-row__name">Почта</span>
                    <span class="profile-info-row__value">{{ userdata.email }}</span>
                </div>
                <div class="profile-info-row">
                    <span class="profile-info-row__name">Логин</span>
                    <span class="profile-info-row__value">{{ userdata.login }}</span>
                </div>
                <div class="profile-info-row">
                    <span class="profile-info-row__name">Имя</span>
                    <span class="profile-info-row__value">{{ userdata.firstName }}</span>
                </div>
                <div class="profile-info-row">
                    <span class="profile-info-row__name">Фамилия</span>
                    <span class="profile-info-row__value">{{ userdata.secondName }}</span>
                </div>
                <div class="profile-info-row">
                    <span class="profile-info-row__name">Имя в чате</span>
                    <span class="profile-info-row__value">{{ userdata.displayName }}</span>
                </div>
                <div class="profile-info-row">
                    <span class="profile-info-row__name">Телефон</span>
                    <span class="profile-info-row__value">{{ userdata.phone }}</span>
                </div>
            </div>

            <div class="profile-actions">
                <div class="profile-actions__wrapper">
                  {{{ editUserdataLink }}}
                </div>
                <div class="profile-actions__wrapper">
                    {{{ editPasswordLink }}}
                </div>
                <div class="profile-actions__wrapper">
                    {{{ logoutLink }}}
                </div>
            </div>
        </div>
    </div>
`

type User = {
  email: string
  login: string
  firstName: string
  secondName: string
  displayName: string
  phone: string
}

type ProfilePageProps = {
  editInfo: boolean
  editPassword: boolean
  userdata: User
  userAvatar: Avatar
  editUserdataLink: Link
  editPasswordLink: Link
  logoutLink: Link
}

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props)
  }

  render() {
    return this.compile(ProfilePageTemplate, this.props)
  }
}

const userdata = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  firstName: 'Иван',
  secondName: 'Иванов',
  displayName: 'Иван',
  phone: '+7 (909) 967 30 30',
}

export const profilePage = new ProfilePage({
  editInfo: false,
  editPassword: false,
  userdata: userdata,
  userAvatar: new Avatar({
    src: 'https://i.ibb.co/k8qJmGG/1.png',
    alt: 'userdata',
  }),
  editUserdataLink: new Link({
    to: routes.editUserdata,
    label: 'Изменить данные',
    className: 'profile-actions__link profile-actions__link_blue',
  }),
  editPasswordLink: new Link({
    to: routes.editPassword,
    label: 'Изменить пароль',
    className: 'profile-actions__link profile-actions__link_blue',
  }),
  logoutLink: new Link({
    to: "#logout",
    label: 'Выйти',
    className: 'profile-actions__link profile-actions__link_red',
  }),
})
