import { User } from '../../constants/types'
import { userdata } from '../../mockData'
import Block from '../../core/Block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import '../profilePage/profilePage.css'
import Form from '../../components/form/form'

const EditPasswordPageTemplate = `
  <div class="profile">
    <div class="back">
      <button class="back__btn">
        <i class="lni lni-arrow-left"></i>
      </button>
    </div>

    <div class="profile-content">
      {{{ editPasswordForm }}}
    </div>
  </div>
`

type EditPasswordPageProps = {
  userdata: User
  editPasswordForm: Form
}

class EditPasswordPage extends Block {
  constructor(props: EditPasswordPageProps) {
    super(props)
  }

  render() {
    return this.compile(EditPasswordPageTemplate, this.props)
  }
}

export const editPasswordPage = new EditPasswordPage({
  userdata: userdata,
  editPasswordForm: new Form({
    className: 'login-form dialog-form',
    inputs: [
      new Input({
        type: 'password',
        name: 'old_password',
        label: 'Старый пароль',
        placeholder: 'Старый пароль',
      }),
      new Input({
        type: 'password',
        name: 'new_password',
        label: 'Новый пароль',
        placeholder: 'Новый пароль',
      }),
      new Input({
        type: 'password',
        name: 'new_password_match',
        label: 'Повторите новый пароль',
        placeholder: 'Повторите новый пароль',
      }),
    ],
    submitBtn: new Button({
      label: 'Сохранить',
      className: 'profile-edit-form__save-btn',
    })
  })
})
