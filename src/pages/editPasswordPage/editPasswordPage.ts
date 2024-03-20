import Block from '../../core/Block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import '../profilePage/profilePage.css'

const EditPasswordPageTemplate = `
  <div class="profile">
    <div class="back">
      <button class="back__btn">
        <i class="lni lni-arrow-left"></i>
      </button>
    </div>

    <div class="profile-content">
      <form action="" class="profile-edit-form">
        {{{ oldPasswordInput }}}
        {{{ newPasswordInput }}}
        {{{ newPasswordMatchInput }}}

        {{{ saveBtn }}}
      </form>
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

type EditPasswordPageProps = {
  editInfo: boolean
  editPassword: boolean
  userdata: User
  oldPasswordInput: Input
  newPasswordInput: Input
  newPasswordMatchInput: Input
  saveBtn: Button
}

class EditPasswordPage extends Block {
  constructor(props: EditPasswordPageProps) {
    super(props)
  }

  render() {
    return this.compile(EditPasswordPageTemplate, this.props)
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

export const editPasswordPage = new EditPasswordPage({
  editInfo: false,
  editPassword: false,
  userdata: userdata,
  oldPasswordInput: new Input({
    type: 'password',
    name: 'old_password',
    label: 'Старый пароль',
    placeholder: 'Старый пароль',
  }),
  newPasswordInput: new Input({
    type: 'password',
    name: 'new_password',
    label: 'Новый пароль',
    placeholder: 'Новый пароль',
  }),
  newPasswordMatchInput: new Input({
    type: 'password',
    name: 'new_password_match',
    label: 'Повторите новый пароль',
    placeholder: 'Повторите новый пароль',
  }),
  saveBtn: new Button({
    label: 'Сохранить',
    className: 'profile-edit-form__save-btn',
  }),
})
