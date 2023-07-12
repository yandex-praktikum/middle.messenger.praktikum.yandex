import Block from '../../utils/Block'
import { redirect } from '../../utils/Helpers.js'
import { template } from './profileedit.templ'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Avatar } from '../../components/Avatar/avatar.js'
import { ButtonAwesome } from '../../components/Buttons/buttons'
import { Form } from '../../components/Form/form'
import { Tag } from '../../components/Tags/tags.js'
import { Routes } from '../../../index.js'
import { inputsData, InputData } from '../../../public/inputsData'
import { ProfileProps } from '../Profile/index.profile.js'
import { withStore } from '../../utils/Store'
import { isEqual } from '../../utils/Helpers.js'
import { User } from '../../api/AuthAPI.js'
import store from '../../utils/Store'
import UserController from '../../controllers/UserController.js'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default

interface EditProfileProps extends ProfileProps {
  password: string
}

export class ProfileEditPageBase extends Block<EditProfileProps> {
  constructor(props: EditProfileProps) {
    super(props)
  }

  init() {
    // TOOLS
    const buttons = [
      {
        icon: 'fa-solid fa-angle-left',
        title: 'Back',
        events: {
          click: () => redirect({ url: Routes.Messenger }),
        },
      },
      {
        icon: 'fa-solid fa-bars',
        title: 'Settings',
        events: {
          click: () => redirect({ url: Routes.Settings }),
        },
      },
    ]

    this.children.tools = new Container({
      content: buttons.map((d) => new ButtonAwesome(d)),
      classes: ['tools-top-container'],
    })

    this.children.editform = this.loadForm(this.props)
  }

  protected componentDidUpdate(oldProps: EditProfileProps, newProps: EditProfileProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.editform = this.loadForm(newProps)
      return true
    }
    return false
  }

  loadForm(props: EditProfileProps) {
    // const { first_name, second_name, login, phone } = props.user

    // FORM
    // create Blocks for the Form
    const info = new Container({
      classes: ['warning-container'],
      content: [
        new Tag({
          tag: 'p',
          content: 'warning',
        }),
      ],
    })

    // store inputs for validation and form submission

    const avatar = new Avatar({
      title: 'Avatar',
      src: props.user.avatar ? props.user.avatar : './public/images/cactus.png',
      classes: ['avatar-profile'],
    })

    const {
      first_name,
      second_name,
      display_name,
      email,
      phone,
      login,
      // password_old,
      // password_new,
      // repeat_password,
    } = inputsData

    const inputs = [
      first_name,
      second_name,
      display_name,
      login,
      email,
      phone,
      // password_old,
      // password_new,
      // repeat_password,
    ].map((d: InputData) => {
      const key = d.name as keyof User
      return new Container({
        classes: ['input-container'],
        content: [
          new Tag({
            tag: 'label',
            content: d.label,
            for: d.name,
            // <label for="html">HTML</label><br>
          }),
          new Input({
            ...d,
            id: d.name,
            value: props.user[key],
            required: true,
            validate: true,
            classes: ['input-square'],
          }),
        ],
      })
    })

    const button = new Button({
      label: 'Save',
    })

    return new Container({
      content: [
        new Form({
          title: 'Edit Profile',
          avatar,
          inputs,
          button,
          info,
          onSubmit: this.onSubmit,
        }),
      ],
      classes: ['form-container'],
    })
  }

  onSubmit(newUserData: User) {
    UserController.editUser(newUserData)
    redirect({ url: Routes.Messenger })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

const withChats = withStore((state) => {
  return { user: state.user || {} }
})

export const ProfileEditPage = withChats(ProfileEditPageBase)
