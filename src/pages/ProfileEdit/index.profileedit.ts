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
import data from '../../../public/data.js'
import { inputsData, InputData } from '../../../public/inputsData'
import * as stylesDefs from './styles.module.scss'
const styles = stylesDefs.default
const { profile: profiledata } = data

export class ProfileEditPage extends Block {
  constructor() {
    super({})
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

    // prefil inputs with profile data
    for (const [key, value] of Object.entries(profiledata)) {
      const input = inputsData[key]
      if (input) input.value = value
    }

    const {
      first_name,
      second_name,
      email,
      phone,
      age,
      city,
      login,
      password_old,
      password_new,
      repeat_password,
    } = inputsData

    const inputs = [
      first_name,
      second_name,
      email,
      phone,
      age,
      city,
      login,
      password_old,
      password_new,
      repeat_password,
    ].map(
      (d: InputData) =>
        new Input({
          ...d,
          required: true,
          validate: true,
          classes: ['input-square'],
        }),
    )
    // store inputs for validation and form submission
    this.props.inputs = inputs

    const button = new Button({
      label: 'Save',
    })
    const avatar = new Avatar({
      title: 'Avatar',
      src: profiledata.avatar,
      classes: ['avatar-profile'],
    })

    // pass Form
    const form = new Form({
      title: 'Edit Profile',
      avatar,
      inputs,
      button,
      info,
    })

    this.children.editform = new Container({
      content: [form],
      classes: ['form-container'],
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
