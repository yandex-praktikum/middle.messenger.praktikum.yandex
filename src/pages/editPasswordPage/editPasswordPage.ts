import Button from '@/components/button/button'
import Form from '@/components/form/form'
import Input from '@/components/input/input'
import { routes } from '@/constants/routes.ts'
import { EditPasswordData } from '@/constants/types.ts'
import { ValidationsMap } from '@/constants/validations.ts'
import { UserController } from '@/controllers/UserController.ts'
import Block from '@/core/Block'
import router from '@/router.ts'
import '../profilePage/profilePage.css'

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

const userController = new UserController()

const submitHandler = (e: Event) => {
  e.preventDefault()
  if (editPasswordForm.getValues()) {
    const values = editPasswordForm.getValues() as EditPasswordData
    userController.editPassword(values).then((resp) => {
      if (resp.status === 200) {
        router.go(routes.profile)
      }
    })
  }
}

const editPasswordForm = new Form({
  className: 'edit-password dialog-form',
  events: {
    submit: submitHandler,
  },
  inputs: [
    new Input({
      type: 'password',
      name: 'old_password',
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
      validation: {
        required: true,
        regExp: ValidationsMap.password,
        errorText: 'Неверный формат пароля',
      },
    }),
    new Input({
      type: 'password',
      name: 'new_password',
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
      validation: {
        required: true,
        regExp: ValidationsMap.password,
        errorText: 'Неверный формат пароля',
      },
    }),
    new Input({
      type: 'password',
      name: 'new_password_verify',
      label: 'Повторите новый пароль',
      placeholder: 'Повторите новый пароль',
      validation: {
        required: true,
        regExp: ValidationsMap.password,
        errorText: 'Неверный формат пароля',
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

export const editPasswordPage = new EditPasswordPage({
  backBtn: new Button({
    label: '<i class="lni lni-arrow-left"></i>',
    className: 'back__btn',
    events: {
      click: () => {
        router.back()
      },
    },
  }),
  editPasswordForm: editPasswordForm,
})
