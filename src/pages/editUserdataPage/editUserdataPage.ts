import { User } from '../../constants/types'
import { userdata } from '../../mockData'
import Block from '../../core/Block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Input from '../../components/input/input'
import '../profilePage/profilePage.css'
import { ValidationsMap } from '../../constants/validations'

const EditUserdataPageTemplate = `
  <div class="profile">
    <div class="back">
      <button class="back__btn">
        <i class="lni lni-arrow-left"></i>
      </button>
    </div>

    <div class="profile-content">
      {{{ editUserDataForm }}}
    </div>
  </div>
`

type EditUserdataPageProps = {
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

export const editUserdataPage = new EditUserdataPage({
  userdata: userdata,
  editUserDataForm: new Form({
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
    submitBtn: new Button({
      label: 'Сохранить',
      className: 'profile-edit-form__save-btn',
    }),
  }),
})
