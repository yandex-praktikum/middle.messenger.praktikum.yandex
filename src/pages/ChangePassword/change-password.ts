import { Block } from '../../utils/Block';
import { IChangePassword } from '../../utils/Interfaces';
import Fields from '../../components/Fields';
import Field from '../../components/Field';
import template from './change-password.hbs';
import Button from '../../components/button';
import { onSubmit } from '../../utils/OnSubmit';
import UserController from '../../controllers/UserController';
import './change-password.less';

export class ChangePassword extends Block {
  constructor(props: IChangePassword) {
    const events = {};
    super({ ...props, events });
  }

  protected init(): void {
    this.children.fields = new Fields({
      fields: [
        new Field({
          isInput: true,
          isData: false,
          label: 'old password',
          type: 'password',
          value: '',
          placeholder: 'old password',
          name: 'oldPassword',
          className: 'password-validated-input',
        }),
        new Field({
          isInput: true,
          isData: false,
          label: 'new password',
          type: 'password',
          value: '',
          placeholder: 'new password',
          name: 'newPassword',
          className: 'password-validated-input',
        }),
        new Field({
          isInput: true,
          isData: false,
          label: 'repeat new password',
          type: 'password',
          value: '',
          placeholder: 'repeat new password',
          name: 'repeat_password',
          className: 'password-validated-input',
        }),
      ],
    });
    this.children.saveButton = new Button({
      label: 'Save',
      className: 'save-button',
      events: {
        click: (e: Event): void => {
          const data = onSubmit(e, 'password-validated-input');
          UserController.updatePassword(data as any);
          const profileBlock = document.querySelector('.profile_block') as HTMLElement;
          profileBlock.style.display = 'flex';
          this.hide();
        },
      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}
