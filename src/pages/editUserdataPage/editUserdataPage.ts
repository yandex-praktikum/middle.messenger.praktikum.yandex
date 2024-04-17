import Button from '@/components/button/button'
import Form from '@/components/form/form'
import Input from '@/components/input/input'
import { routes } from '@/constants/routes.ts'
import { User } from '@/constants/types'
import { ValidationsMap } from '@/constants/validations'
import { UserController } from '@/controllers/UserController.ts'
import Block from '@/core/Block'
import router from '@/router.ts'
import '../profilePage/profilePage.css'
import connect from '@/utils/connect.ts'

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
}

class EditUserdataPage extends Block {
  constructor(props: EditUserdataPageProps) {
    super(props)
  }

  render() {
    return this.compile(EditUserdataPageTemplate, this.props)
  }
}

const userController = new UserController()

const submitHandler = (e: Event) => {
  e.preventDefault()
  if (editUserdataForm.getValues()) {
    const values = editUserdataForm.getValues() as Partial<User>
    userController.editProfile(values).then((resp) => {
      if (resp.status === 200) {
        router.go(routes.profile)
      }
    })
  }
}

const emailInputWithUserdata = connect((state) => ({ value: state.userdata.email }))(
  Input
)
const loginInputWithUserdata = connect((state) => ({ value: state.userdata.login }))(
  Input
)
const firstNameInputWithUserdata = connect((state) => ({ value: state.userdata.first_name }))(
  Input
)
const secondNameInputWithUserdata = connect((state) => ({ value: state.userdata.second_name }))(
  Input
)
const displayNameInputWithUserdata = connect((state) => ({ value: state.userdata.display_name }))(
  Input
)
const phoneNameInputWithUserdata = connect((state) => ({ value: state.userdata.phone }))(
  Input
)

const editUserdataForm = new Form({
  className: 'edit-userdata dialog-form',
  events: {
    submit: submitHandler,
  },
  inputs: [
    new emailInputWithUserdata({
      type: 'text',
      name: 'email',
      label: 'Почта',
      placeholder: 'Почта',
      validation: {
        regExp: ValidationsMap.email,
        errorText: 'Неверный формат почты',
      },
    }),
    new loginInputWithUserdata({
      type: 'text',
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      validation: {
        regExp: ValidationsMap.login,
        errorText: 'Неверный формат логина',
      },
    }),
    new firstNameInputWithUserdata({
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      validation: {
        regExp: ValidationsMap.name,
        errorText: 'Неверный формат имени',
      },
    }),
    new secondNameInputWithUserdata({
      type: 'text',
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      validation: {
        regExp: ValidationsMap.name,
        errorText: 'Неверный формат фамилии',
      },
    }),
    new displayNameInputWithUserdata({
      type: 'text',
      name: 'display_name',
      label: 'Имя в чате',
      placeholder: 'Имя в чате',
      validation: {
        regExp: ValidationsMap.name,
        errorText: 'Неверный формат фамилии',
      },
    }),
    new phoneNameInputWithUserdata({
      type: 'text',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
      validation: {
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
