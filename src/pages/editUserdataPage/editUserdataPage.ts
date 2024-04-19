import Button from '@/components/button/button'
import Form from '@/components/form/form'
import Input from '@/components/input/input'
import { routes } from '@/constants/routes.ts'
import { User } from '@/constants/types'
import { ValidationsMap } from '@/constants/validations'
import { UserController } from '@/controllers/UserController.ts'
import Block, { Props } from '@/core/Block'
import store from '@/core/Store.ts'
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

  componentDidUpdate(oldProps?: Props, newProps?: Partial<Props>): boolean {
    editUserdataForm.setValues(
      store.getState().userdata as Omit<User, 'id' | 'avatar'>
    )
    return super.componentDidUpdate(oldProps, newProps)
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

const editUserdataForm = new Form({
  className: 'edit-userdata dialog-form',
  events: {
    submit: submitHandler,
  },
  inputs: [
    new Input({
      type: 'text',
      name: 'email',
      label: 'Почта',
      placeholder: 'Почта',
      validation: {
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

const pageWithUserdata = connect((state) => ({ userdata: state.userdata }))(
  EditUserdataPage
)

export const editUserdataPage = new pageWithUserdata({
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
