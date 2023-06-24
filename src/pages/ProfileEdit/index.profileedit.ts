import Block from '../../utils/Block'
import { redirect, log } from '../../commonActions/actions.js'
import { template } from './profileedit.templ'
import { Container } from '../../components/Containers/containers'
import { Button } from '../../components/Buttons/buttons'
import { Input } from '../../components/Input/input'
import { Avatar } from '../../components/Avatar/avatar.js'
import { ButtonAwesome } from '../../components/Buttons/buttons'
import { Form } from '../../components/Form/form'
// import { SignupData } from '../../api/AuthAPI'
// import AuthController from '../../controllers/AuthController'
import data from '../../../public/data.js'
import * as stylesDefs from '../../scss/styles.module.scss'
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
          click: () => redirect({ url: '/messenger' }),
        },
      },
      {
        icon: 'fa-solid fa-bars',
        title: 'Settings',
        events: {
          click: () => redirect({ url: '/settings' }),
        },
      },
    ]
    this.children.tools = new Container({
      content: buttons.map((d) => new ButtonAwesome(d)),
      classes: ['tools-top-container'],
    })

    // FORM
    const inputsData = [
      {
        type: 'text',
        name: 'first_name',
        classes: ['.input-square'],
        value: profiledata.first_name,
        placeholder: 'Enter your name',
        required: true,
        autofocus: true,
      },
      {
        type: 'text',
        name: 'second_name',
        value: profiledata.second_name,
        classes: ['.input-square'],
        placeholder: 'Enter your last name',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        classes: ['.input-square'],
        value: profiledata.email,
        placeholder: 'Enter your email',
        required: true,
      },
      {
        type: 'tel',
        name: 'phone',
        classes: ['.input-square'],
        value: profiledata.phone,
        placeholder: 'Enter phone number',
        required: false,
      },
      {
        type: 'number',
        name: 'age',
        classes: ['.input-square'],
        value: profiledata.age,
        placeholder: 'Enter your age',
      },
      {
        type: 'text',
        name: 'city',
        classes: ['.input-square'],
        value: profiledata.city,
        placeholder: 'Enter your city',
        required: false,
      },
      {
        type: 'password',
        name: 'old_password',
        classes: ['.input-square'],
        placeholder: 'Enter old password',
        required: true,
      },
      {
        type: 'password',
        name: 'new_password',
        classes: ['.input-square'],
        placeholder: 'Create new password',
        required: true,
      },
      {
        type: 'password',
        name: 'repeat_password',
        classes: ['.input-square'],
        placeholder: 'Repeat password',
        required: true,
      },
    ]
    const inputs = inputsData.map((d) => new Input({ ...d, classes: ['input-square'] }))
    // store inputs for submittion
    this.props.inputs = inputs
    const button = new Button({
      label: 'Save',
      events: {
        click: () => this.onSubmit(),
      },
    })
    const avatar = new Avatar({
      title: 'Avatar',
      src: profiledata.avatar,
      classes: ['avatar-profile'],
    })
    const form = new Form({
      title: 'Edit Profile',
      avatar,
      inputs,
      button,
    })
    this.children.form = new Container({
      content: [form],
      classes: ['form-container'],
    })
  }

  onSubmit() {
    console.log('submit Profile Edit')
    const inputs = this.props.inputs
    const values = inputs.map((i: Input) => [i.getName(), i.getValue()])
    const data = Object.fromEntries(values)
    console.log(data)

    // AuthController.signin(data as SignupData)
    // redirect({ url: '/profile' })
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
