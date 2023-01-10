import parseTemplate from "../../components/parse-template";
import { template } from "./template";
import "../profile/styles.scss";

const signUpPage = () => {
  const values = {
    pageTitle: "Регистрация",
    title: "Регистрация",
    email: "Почта",
    login: "Логин",
    name: "Имя",
    surname: "Фамилия",
    phone: "Телефон",
    password: "Пароль",
    password_confirm: "Пароль (ещё раз)",
    button: "Зарегистрироваться",
    error: "Ошибка ошибка ошибка",
    login_link: "Войти"
  };
  const content = parseTemplate(template, values);
  return { pageTitle: values.pageTitle, content: content };
};

export default signUpPage;
