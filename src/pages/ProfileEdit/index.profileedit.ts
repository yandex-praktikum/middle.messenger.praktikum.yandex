import Block from '../../utils/Block';
import {
  clearFormInputs,
  formDataToJson,
  redirect,
  isEqual,
} from '../../utils/Helpers.js';
import { template } from './profileedit.templ';
import { Container } from '../../components/Containers/containers';
import { Button, ButtonAwesome } from '../../components/Buttons/buttons';
import { Input } from '../../components/Input/input';
import { Avatar } from '../../components/AvatarProfile/avatarProfile.js';
import { Form } from '../../components/Form/form';
import { Tag } from '../../components/Tags/tags.js';
import { Routes } from '../../../index.js';
import { inputsData, InputData } from '../../../public/inputsData';
import { ProfileProps } from '../Profile/index.profile.js';
import store, { withStore } from '../../utils/Store';
import { User } from '../../api/AuthAPI.js';
import { validateForm } from '../../utils/FormValidator.js';
import { UserUpdate } from '../../api/UserAPI';
import { setStyles } from '../../utils/Helpers';
import UserController from '../../controllers/UserController.js';
import * as stylesDefs from './styles.module.scss';

const styles = stylesDefs.default;

interface EditProfileProps extends ProfileProps {
  password: string;
}

export class ProfileEditPageBase extends Block<EditProfileProps> {
  constructor(props: EditProfileProps) {
    super(props);
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
        // events: {
        //   click: () => redirect({ url: Routes.Settings }),
        // },
      },
    ];

    this.children.tools = new Container({
      content: buttons.map((d) => new ButtonAwesome(d)),
      classes: ['tools-top-container'],
    });

    this.children.editAvatarPopup = new Container({
      /// overlay
      content: [
        new Container({
          /// container for the form
          content: [
            new Form({
              title: 'Select file for avatar',
              inputs: [
                new Container({
                  classes: ['input-container'],
                  content: [
                    new Tag({
                      tag: 'label',
                      content: 'Select file',
                      for: 'avatar',
                    }),
                    new Input({
                      name: 'avatar',
                      type: 'file',
                      accept: '.jpg,.jpeg,.png',
                      placeholder: 'Select file',
                      required: true,
                      validate: false,
                      classes: ['input-square'],
                    }),
                  ],
                }),
              ],
              buttons: [
                new Button({
                  label: 'Change Avatar',
                  type: 'submit',
                }),
                new Button({
                  label: 'Cancel',
                  classes: ['button-cancel'],
                  events: {
                    click: () => this.closePopup('editAvatarPopup'),
                  },
                }),
              ],
              events: {
                submit: this.editAvatarSubmit.bind(this),
              },
            }),
          ],
          classes: ['form-container'],
        }),
      ],
      classes: ['overlay-container'],
    });

    this.children.editPasswordPopup = new Container({
      /// overlay
      content: [
        new Container({
          /// container for the form
          content: [
            new Form({
              title: 'Change Password',
              inputs: [
                new Container({
                  classes: ['input-container'],
                  content: [
                    new Tag({
                      tag: 'label',
                      content: 'Old password',
                      for: 'oldPassword',
                    }),
                    new Input({
                      name: 'oldPassword',
                      type: 'password',
                      placeholder: 'Enter your old password',
                      required: true,
                      validate: false,
                      classes: ['input-square'],
                    }),
                  ],
                }),
                new Container({
                  classes: ['input-container'],
                  content: [
                    new Tag({
                      tag: 'label',
                      content: 'New password',
                      for: 'newPassword',
                    }),
                    new Input({
                      name: 'newPassword',
                      type: 'password',
                      placeholder: 'Enter new password',
                      required: true,
                      validate: false,
                      classes: ['input-square'],
                    }),
                  ],
                }),
                new Container({
                  classes: ['input-container'],
                  content: [
                    new Tag({
                      tag: 'label',
                      content: 'repeat password',
                      for: 'repeatPassword',
                    }),
                    new Input({
                      name: 'repeatPassword',
                      type: 'password',
                      placeholder: 'repeat new password',
                      required: true,
                      validate: false,
                      classes: ['input-square'],
                    }),
                  ],
                }),
              ],
              buttons: [
                new Button({
                  label: 'Change password',
                  type: 'submit',
                }),
                new Button({
                  label: 'Cancel',
                  classes: ['button-cancel'],
                  events: {
                    click: () => this.closePopup('editPasswordPopup'),
                  },
                }),
              ],
              events: {
                submit: this.editPasswordSubmit.bind(this),
              },
            }),
          ],
          classes: ['form-container'],
        }),
      ],
      classes: ['overlay-container'],
    });

    this.children.editform = this.loadForm(this.props);
  }

  protected componentDidUpdate(
    oldProps: EditProfileProps,
    newProps: EditProfileProps
  ): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.editform = this.loadForm(newProps);
      return true;
    }
    return false;
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
    });

    const avatar = new Container({
      content: [
        new Avatar({
          title: 'Avatar',
          src: props.user.avatar,
          classes: ['avatar-profile'],
        }),
        new ButtonAwesome({
          icon: 'far fa-edit',
          title: 'Change Avatar',
          events: {
            click: () => this.openPopup('editAvatarPopup'),
          },
        }),
      ],
      classes: ['edit-profile-avatar-container'],
    });

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
    } = inputsData;

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
      const key = d.name as keyof User;
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
      });
    });

    const editProfileSubmitButton = new Button({
      label: 'Save',
      type: 'submit',
    });

    const editPasswordButton = new Button({
      label: 'Change password',
      type: 'button',
      events: {
        click: () => this.openPopup('editPasswordPopup'),
      },
    });

    return new Container({
      content: [
        new Form({
          title: 'Edit Profile',
          avatar,
          inputs,
          buttons: [editProfileSubmitButton, editPasswordButton],
          info,
          events: {
            submit: this.editProfileSubmit.bind(this),
          },
        }),
      ],
      classes: ['form-container'],
    });
  }

  async editProfileSubmit(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    if (!validateForm(this.children.editform as Block)) return;
    const formData = new FormData(form);
    const data = formDataToJson(formData) as UserUpdate;
    const res = await UserController.editProfile(data);
    if (res.success) {
      alert('User details updated');
    } else {
      alert(
        `There were some problems updating user details. ${JSON.stringify(
          res.error
        )}`
      );
      return;
    }
  }

  async editAvatarSubmit(e: Event) {
    e.preventDefault();
    // const oldAvatar = store.getUser().avatar;
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    const res = await UserController.editAvatar(formData);

    if (res.success) {
      alert('Avatar updated');
    } else {
      alert(
        `There were some problems updating avatar. ${JSON.stringify(res.error)}`
      );
      return;
    }
    clearFormInputs(form);
    this.closePopup('editAvatarPopup');
  }

  async editPasswordSubmit(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form) return;
    // if (!validateForm(this.children.editAvatarPopupas Block)) return
    const formData = new FormData(form);
    const data = formDataToJson(formData);

    const { oldPassword, newPassword, repeatPassword } = data as Record<
      string,
      string
    >;
    if (!oldPassword) {
      alert('Please enter old password');
      return;
    }
    if (!newPassword) {
      alert('Please enter new password');
      return;
    }
    if (!repeatPassword) {
      alert('Please repeat new password');
      return;
    }
    if (newPassword !== repeatPassword) {
      alert("New password and repeat password don't match");
      return;
    }
    const res = await UserController.editPassword({ oldPassword, newPassword });
    if (res.success) {
      alert('Password updated');
    } else {
      alert(
        `There were some problems updating password. ${JSON.stringify(
          res.error
        )}`
      );
      return;
    }
    clearFormInputs(form);
    this.closePopup('editPasswordPopup');
  }

  openPopup(popupName: string) {
    const block = this.children[popupName] as Block;
    const popup = block.getContent() as HTMLElement;
    if (popup) {
      setStyles(popup, {
        display: 'inline-block',
      });
    }
  }

  closePopup(popupName: string) {
    const block = this.children[popupName] as Block;
    const popup = block.getContent() as HTMLElement;
    if (popup) {
      setStyles(popup, {
        display: 'none',
      });
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ user: state.user || {} }));

export const ProfileEditPage = withChats(ProfileEditPageBase);
