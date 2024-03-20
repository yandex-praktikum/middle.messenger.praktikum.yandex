import Block from '../../core/Block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import '../profilePage/profilePage.css'

const EditUserdataPageTemplate = `
  <div class="profile">
    <div class="back">
      <button class="back__btn">
        <i class="lni lni-arrow-left"></i>
      </button>
    </div>

    <div class="profile-content">
      <form action="" class="profile-edit-form">
        {{{ emailInput }}}
        {{{ loginInput }}}
        {{{ firstNameInput }}}
        {{{ secondNameInput }}}
        {{{ displayNameInput }}}
        {{{ phoneInput }}}

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

type EditUserdataPageProps = {
  userdata: User
  emailInput: Input
  loginInput: Input
  firstNameInput: Input
  secondNameInput: Input
  displayNameInput: Input
  phoneInput: Input
  saveBtn: Button
}

class EditUserdataPage extends Block {
  constructor(props: EditUserdataPageProps) {
    super(props)
  }

  render() {
    return this.compile(EditUserdataPageTemplate, this.props)
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

export const editUserdataPage = new EditUserdataPage({
  userdata: userdata,
  emailInput: new Input({
    type: 'text',
    name: 'email',
    label: 'Почта',
    initialValue: userdata.email,
    placeholder: 'Почта',
  }),
  loginInput: new Input({
    type: 'text',
    name: 'login',
    label: 'Логин',
    initialValue: userdata.login,
    placeholder: 'Логин',
  }),
  firstNameInput: new Input({
    type: 'text',
    name: 'first_name',
    label: 'Имя',
    initialValue: userdata.firstName,
    placeholder: 'Имя',
  }),
  secondNameInput: new Input({
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    initialValue: userdata.secondName,
    placeholder: 'Фамилия',
  }),
  displayNameInput: new Input({
    type: 'text',
    name: 'display_name',
    label: 'Имя в чате',
    initialValue: userdata.displayName,
    placeholder: 'Имя в чате',
  }),
  phoneInput: new Input({
    type: 'text',
    name: 'phone',
    label: 'Телефон',
    initialValue: userdata.phone,
    placeholder: 'Телефон',
  }),
  saveBtn: new Button({
    label: 'Сохранить',
    className: 'profile-edit-form__save-btn',
  }),
})
