import Fields from '../../components/fields';
import Field from '../../components/field';
import { Block } from '../../utils/block';
import { IProfilePageBase, IProfileInfo } from '../../utils/interfaces'
import template from './profile.hbs';
import './profile.less';
import Button from '../../components/button';
import ChangePassword from '../change-password';
import EditProfile from '../edit-profile';
import AuthController from '../../controllers/auth-controller';
import UserController from '../../controllers/user-controller';
import { withStore } from '../../hocs/with-store';
import Popup from '../../components/popup';
import Input from '../../components/input';
import Avatar from '../../components/avatar';
import Close from '../../components/close';
import Link from '../../components/link';

export class ProfilePageBase extends Block {
  constructor(props: IProfilePageBase) {
    super(props);
  }

  async componentDidMount() {
    await AuthController.fetchUser();
  }

  init(): void {
    this.children.backButton = new Link({
      path: '/messenger',
      text: '<-',
      className: 'back-button',
    });
    
    this.children.avatar = new Avatar({
      className: 'avatar',
      photo:
        this.props.avatar === null
          ? '../../../static/images/default-ava.svg'
          : `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
      events: {
        click: () => {
          (this.children.popup as Popup).show();
        },
      },
    });

    this.children.fields = new Fields({
      fields: [
        new Field({
          data: this.props.email,
          label: 'email',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: this.props.login,
          label: 'login',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: this.props.first_name,
          label: 'first name',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: this.props.second_name,
          label: 'second name',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: this.props.display_name,
          label: 'display name',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: this.props.phone,
          label: 'phone',
          isInput: false,
          isData: true,
        }),
      ],
    });
    this.children.editButton = new Button({
      label: 'Edit profile',
      className: 'profile-button',
      events: {
        click: () => {
          const profileBlock = document.querySelector(
            '.profile_block'
          ) as HTMLElement;
          profileBlock.style.display = 'none';
          (this.children.editProfile as EditProfile).show();
        },
      },
    });
    this.children.changePassButton = new Button({
      label: 'Change password',
      className: 'profile-button',
      events: {
        click: () => {
          const profileBlock = document.querySelector(
            '.profile_block'
          ) as HTMLElement;
          profileBlock.style.display = 'none';
          (this.children.changePassword as ChangePassword).show();
        },
      },
    });
    this.children.logoutButton = new Button({
      label: 'Log out',
      className: 'profile-button red',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
    
    this.children.editProfile = new EditProfile(this.props);
    this.children.changePassword = new ChangePassword(this.props);
    this.children.popup = new Popup({
      title: 'Upload file',
      button: new Button({
        label: 'Change',
        type: 'submit',
        events: {
          click: (e: any) => {
            e.preventDefault();
            const formData = new FormData();
            const input: any = document.querySelector('#avatar');

            formData.append('avatar', input?.files[0]);

            UserController.updateAvatar(formData);
            (this.children.popup as Popup).hide();
          },
        },
      }),
      close: new Close({
        events: {
          click: () => {
            (this.children.popup as Popup).hide();
          },
        },
      }),
      content: new Input({
        label: '',
        type: 'file',
        placeholder: 'file',
        name: 'avatar',
        className: 'avatar-validated-input',
      }),
    });
  }

  protected componentDidUpdate(oldProps: IProfileInfo, newProps: IProfileInfo): boolean {
    (this.children.avatar as Avatar).setProps({
      photo:
        newProps.avatar === null
          ? '../../static/images/default-ava.svg'
          : `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`,
    });

    this.children.fields = new Fields({
      fields: [
        new Field({
          data: newProps.email,
          label: 'email',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: newProps.login,
          label: 'login',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: newProps.first_name,
          label: 'first name',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: newProps.second_name,
          label: 'second name',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: newProps.display_name,
          label: 'display name',
          isInput: false,
          isData: true,
        }),
        new Field({
          data: newProps.phone,
          label: 'phone',
          isInput: false,
          isData: true,
        }),
      ],
    });

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));
export const ProfilePage = withUser(ProfilePageBase as typeof Block);
