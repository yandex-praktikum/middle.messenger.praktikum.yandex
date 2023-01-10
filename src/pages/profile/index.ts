import parseTemplate from "../../components/parse-template";
import { template } from "./template";
import { editTemplate } from "./template_edit";
import { editPasswordTemplate } from "./template_edit_password";
import "./styles.scss";

const values = {
  pageTitle: "Профиль",
  title: "Профиль",
  photo: "Загрузить фото",
  email: "Почта",
  login: "Логин",
  name: "Имя",
  surname: "Фамилия",
  chat_name: "Имя в чате",
  phone: "Телефон",
  edit: "Изменить данные",
  edit_password: "Изменить пароль",
  sign_out: "Выйти",
  back: "Вернуться назад",
  pageTitleEdit: "Редактировать профиль",
  titleEdit: "Редактировать профиль",
  pageTitleEditPassword: "Изменить пароль",
  titleEditPassword: "Изменить пароль",
  oldPassword: "Старый пароль",
  newPassword: "Новый пароль",
  confirmPassword: "Повторите новый пароль",
  passwordBtn: "Сохранить",
};

export const profilePage = () => {
  const content = parseTemplate(template, values);
  return { pageTitle: values.pageTitle, content: content };
};

export const editProfilePage = () => {
  const content = parseTemplate(editTemplate, values);
  return { pageTitle: values.pageTitleEdit, content: content };
};

export const editProfilePasswordPage = () => {
  const content = parseTemplate(editPasswordTemplate, values);
  return { pageTitle: values.pageTitleEditPassword, content: content };
};
