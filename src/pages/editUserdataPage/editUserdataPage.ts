import router from '@/router.ts'
import { User } from '@/constants/types'
import { ValidationsMap } from '@/constants/validations'
import Block from '@/core/Block'
import Button from '@/components/button/button'
import Form from '@/components/form/form'
import Input from '@/components/input/input'
import '../profilePage/profilePage.css'
import store from '@/core/Store.ts'

const EditUserdataPageTemplate = `
  <div class="profile">
    <div class="back">
      {{{ backBtn }}}
    </div>

    <div class="profile-content">
      {{{ editUserDataForm }}}
    </div>
  </div>
`

type EditUserdataPageProps = {
  backBtn: Button
  editUserDataForm: Form
  userdata: User
}

class EditUserdataPage extends Block {
  constructor(props: EditUserdataPageProps) {
    super(props)
  }

  render() {
    return this.compile(EditUserdataPageTemplate, this.props)
  }
}

const editUserdataForm = new Form({
  className: 'login-form dialog-form',
  inputs: [
    new Input({
      type: 'text',
      name: 'email',
      label: 'Почта',
      placeholder: 'Почта',
      validation: {
        required: true,
        regExp: ValidationsMap.email,
        errorText: 'Неверный формат почты',
      },
    }),
    new Input({
      type: 'text',
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      validation: {
        required: true,
        regExp: ValidationsMap.login,
        errorText: 'Неверный формат логина',
      },
    }),
    new Input({
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      validation: {
        required: true,
        regExp: ValidationsMap.name,
        errorText: 'Неверный формат имени',
      },
    }),
    new Input({
      type: 'text',
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      validation: {
        required: true,
        regExp: ValidationsMap.name,
        errorText: 'Неверный формат фамилии',
      },
    }),
    new Input({
      type: 'text',
      name: 'display_name',
      label: 'Имя в чате',
      placeholder: 'Имя в чате',
      validation: {
        required: true,
        regExp: ValidationsMap.name,
        errorText: 'Неверный формат фамилии',
      },
    }),
    new Input({
      type: 'text',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
      validation: {
        required: true,
        regExp: ValidationsMap.phone,
        errorText: 'Неверный формат телефона',
      },
    }),
  ],
  submitBtn: new Input({
    type: 'submit',
    name: 'submit',
    value: 'Сохранить',
    label: '',
    classNameInput: 'button input-submit',
  }),
})

export const editUserdataPage = new EditUserdataPage({
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
  editUserDataForm: editUserdataForm,
})
