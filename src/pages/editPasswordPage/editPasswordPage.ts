import router from '@/router.ts'
import { User } from '@/constants/types'
import Block from '@/core/Block'
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import Form from '@/components/form/form'
import '../profilePage/profilePage.css'
import store from '@/core/Store.ts'

// language=hbs
const EditPasswordPageTemplate = `
  <div class="profile">
    <div class="back">
      {{{ backBtn }}}
    </div>

    <div class="profile-content">
      {{{ editPasswordForm }}}
    </div>
  </div>
`

type EditPasswordPageProps = {
  userdata: User
  backBtn: Button
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
  userdata: store.getState().userdata,
  backBtn: new Button({
    label: '<i class="lni lni-arrow-left"></i>',
    className: 'back__btn',
    events: {
      click: () => {
        router.back()
      },
    },
  }),
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
    }),
  }),
})
