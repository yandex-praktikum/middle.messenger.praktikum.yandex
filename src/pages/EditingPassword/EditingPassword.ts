import { Block } from "../../core/index";
import template from "./EditingPassword.tmp.pug";
import {
  EditingPasswordForm,
  FieldText,
  Button,
} from "../../components/index";

export default class EditingPassword extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      userName: 'User name',
      userSettings: new EditingPasswordForm({
        currentPassword: new FieldText({
          withId: true,
          title: 'Current password:',
          type: 'password',
          name: 'old_password',
          value: 'jzuXon8ZOT',
          helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*',
          tmp: 'setting',
        }),
        newPassword: new FieldText({
          withId: true,
          title: 'New password:',
          type: 'password',
          name: 'new_password',
          value: '',
          helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*',
          tmp: 'setting',
        }),
        repeatNewPassword: new FieldText({
          withId: true,
          title: 'Repeat new password:',
          type: 'password',
          name: 'repeat_password',
          value: '',
          helpText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          pattern: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*',
          tmp: 'setting',
        }),
      }),
      saveBtn: new Button({
        className: 'link',
        type: 'submit',
        form: 'userSettingsForm',
        text: 'Save password',
      }),
    }

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
