import Avatar from '@/components/avatar/avatar'
import Button from '@/components/button/button.ts'
import Link from '@/components/link/link'
import { routes } from '@/constants/routes'
import { User } from '@/constants/types'
import { AuthController } from '@/controllers/AuthController.ts'
import { UserController } from '@/controllers/UserController.ts'
import Block from '@/core/Block'
import store from '@/core/Store.ts'
import router from '@/router.ts'
import { withUserAvatar, withUserdata } from '@/utils/connect.ts'
import './profilePage.css'

// language=hbs
const ProfilePageTemplate = `
  <div class="profile">
    <div class="back">
      {{{ backBtn }}}
    </div>

    <div class="profile-content">
      <div class="profile__avatar">{{{ avatar }}}</div>
      
      <span class="profile-content__username">{{ userdata.display_name }}</span>

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
          <span class="profile-info-row__value">{{ userdata.first_name }}</span>
        </div>
        <div class="profile-info-row">
          <span class="profile-info-row__name">Фамилия</span>
          <span class="profile-info-row__value">{{ userdata.second_name }}</span>
        </div>
        <div class="profile-info-row">
          <span class="profile-info-row__name">Имя в чате</span>
          <span class="profile-info-row__value">{{ userdata.display_name }}</span>
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

type ProfilePageProps = {
  backBtn: Button
  avatar: Avatar
  userdata: User
  editUserdataLink: Link
  editPasswordLink: Link
  logoutLink: Link
}

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props)
  }

  componentDidMount() {
    if (!store.getState().userdata) {
      router.go(routes.login)
    }
  }

  render() {
    return this.compile(ProfilePageTemplate, this.props)
  }
}

const authController = new AuthController()
const userController = new UserController()

const avatarUploadHandler = () => {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'

  fileInput.onchange = async (e: Event) => {
    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.files) {
      const formData = new FormData()
      formData.append('avatar', e.currentTarget.files[0])
      userController.editAvatar(formData)
    }
  }

  fileInput.click()
}

const logoutBtnHandler = () => {
  authController.logout().then((resp) => {
    if (resp.status === 200) {
      router.go(routes.login)
    }
  })
}

const connectedProfilePage = withUserdata(ProfilePage)
const connectedAvatar = withUserAvatar(Avatar)

export const profilePage = new connectedProfilePage({
  userdata: store.getState().userdata,
  backBtn: new Button({
    label: '<i class="lni lni-arrow-left"></i>',
    className: 'back__btn',
    events: {
      click: () => {
        router.go(routes.messenger)
      },
    },
  }),
  avatar: new connectedAvatar({
    src: store.getState().userdata.avatar,
    alt: 'avatar',
    events: {
      click: avatarUploadHandler,
    },
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
  logoutLink: new Button({
    events: {
      click: logoutBtnHandler
    },
    label: 'Выйти',
    className: 'link profile-actions__link profile-actions__link_red',
  }),
})
