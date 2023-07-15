import Block from '../../utils/Block'
import { imageExists, redirect } from '../../utils/Helpers.js'
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
import {
  setStyles,
  // isEqual,
  // isEqualProxy,
  // arrayLeftRightIntersect,
  // parseDate,
  // cloneDeep,
} from '../../utils/Helpers'
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
    this.children.addAvatarPopup = new Container({
      content: [
        new Container({
          content: [
            new Tag({
              tag: 'h2',
              content: 'Select file for avatar',
            }),
            new Input({
              name: 'change-avatar',
              type: 'file',
              accept: '.jpg,.jpeg,.png',
              placeholder: 'Select file',
              required: true,
              validate: false,
              classes: ['input-square'],
            }),
            new Button({
              label: 'Change Avatar',
              events: {
                click: this.changeAvatar.bind(this),
              },
            }),
            new Button({
              label: 'Cancel',
              classes: ['button-cancel'],
              events: {
                click: () => this.closeCreateAddAvatarDialog(),
              },
            }),
          ],
        }),
      ],
      classes: ['add-avatar-container'],
    })

    const avatar = new Container({
      content: [
        new Avatar({
          title: 'Avatar',
          // src: imageExists(props.user.avatar) ? props.user.avatar : './public/images/cactus.png',
          classes: ['avatar-profile'],
        }),
        new ButtonAwesome({
          icon: 'far fa-edit',
          title: 'Change Avatar',
          events: {
            click: this.openCreateAddAvatarDialog.bind(this),
            // click: () => console.log('click'),
          },
        }),
      ],
      classes: ['edit-profile-avatar-container'],
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
    console.log(newUserData)
    UserController.editUser(newUserData)
    // redirect({ url: Routes.Messenger })
  }

  changeAvatar() {
    // const formData = new FormData(e.target);

    const popup = this.children.addAvatarPopup as Block
    const container = popup.children.content as Block[]
    const children = container[0].children.content as Block[]
    const input = children[1]
    const inputElement = input.getContent() as HTMLInputElement
    // const avatar = inputElement.files[0].name
    // const user = store.getUser()
    // console.log({ ...user, avatar })
    console.log(inputElement.files)

    const file = inputElement.files[0]
    console.log(file)
    /// logs file
    const data = new FormData()
    if (file) {
      data.append('avatar', file)
    }
    console.log(data.get('avatar'))
    /// logs file

    UserController.addAvatar(data).then((res) => {
      console.log(res)
    })

    // curl -X 'PUT' \
    // 'https://ya-praktikum.tech/api/v2/user/profile/avatar' \
    // -H 'accept: application/json' \
    // -H 'Content-Type: multipart/form-data' \
    // -F 'avatar=@Screenshot 2023-05-26 at 11.13.22 am.png;type=image/png'
    // change avatar here

    this.closeCreateAddAvatarDialog()
  }

  openCreateAddAvatarDialog() {
    console.log('open')
    const element = this.children.addAvatarPopup as Block
    const addAvatarPopup = element.getContent() as HTMLElement
    console.log(addAvatarPopup)
    if (addAvatarPopup) {
      setStyles(addAvatarPopup, {
        display: 'inline-block',
      })
    }
  }

  closeCreateAddAvatarDialog() {
    const element = this.children.addAvatarPopup as Block
    const addAvatarPopup = element.getContent() as HTMLElement
    if (addAvatarPopup) {
      setStyles(addAvatarPopup, {
        display: 'none',
      })
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}

const withChats = withStore((state) => {
  return { user: state.user || {} }
})

export const ProfileEditPage = withChats(ProfileEditPageBase)
