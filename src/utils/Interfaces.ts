import { Block } from './block';
import { PropsWithRouter } from '../hocs/with-router'
//import { IMessage as MessageInfo } from '../controllers/message-controller';

export interface ISignupData {
  first_name?: string;
  second_name?: string;
  login?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface ISigninData {
  login?: string;
  password?: string;
}

export interface IUserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface IUserInfo {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IChatInfo {
  selectedChat: any;
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUserData;
    time: string;
    content: string;
  };
}

export interface IAvatar {
  photo?: string;
  className?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export interface IButtonProps {
  label?: string;
  className?: string;
  type?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export interface IChat {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: IChatInfo;
  last_message: Record<string, string>;
  avatar: string;
  events: {
    click: () => void;
  };
}

export interface IChatsListProps {
  chats: Block[];
  isLoaded: boolean;
}

export interface IClose {
  events?: {
    click: (e: Event) => void;
  };
}

export interface IError {
  number: string;
  text: string;
  link: string;
}

export interface IField {
  isInput: boolean;
  isData: boolean;
  label: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  data?: string;
  className?: string;
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  };
}

export interface IFields {
  fields: Block[];
  button?: Block;
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export interface IForm {
  name: string;
  inputs: Block[];
  button: Block;
  link: Block;
  linkText: string;
  buttonsClass: string;
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export interface IInput {
  label: string;
  type: string;
  name: string;
  value?: string;
  placeholder: string;
  className?: string;
  noError?: boolean;
  divClass?: string;
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  };
}

export interface ILink extends PropsWithRouter {
  path: string;
  text: string;
  className?: string;
  events?: {
    click: () => void;
  };
}

export interface IMessageProps {
  content?: string;
  isMine?: boolean;
  userId?: string;
  time?: string;
}

export interface IMessenger {
  selectedChat?: number | undefined;
  messages?: IMessage;
  userId: number;
  photo?: string;
  className?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export interface IPopup {
  title: string;
  content?: Block;
  button: Block;
  close: Block;
  className?: string;
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export interface IProfilePopupContent {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  className?: string;
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  };
}

export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

export interface IState {
  user: IUserData;
  chats: IChatInfo[];
  messages: Record<number, IMessage[]>;
  selectedChat?: number;
}

export interface IChangePassword {
  fields: Block[];
  saveButton?: Block;
}

export interface IEditProfile {
  fields: Block[];
  saveButton: Block;
}

export interface IProfilePageBase {
  fields: Block[];
  avatar: Block;
  editButton: Block;
  changePassButton: Block;
  logoutButton: Block;
  editProfile: Block;
  changePassword: Block;
  popup: Block;
}

export interface IProfileInfo {
  avatar: string;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

export interface IValidateExp {
  error: string;
  regExp: RegExp;
}
