import parseTemplate from "../../components/parse-template";
import { template } from "./template";
import "../profile/styles.scss";

const signInPage = () => {
  const values = {
    pageTitle: "Авторизация",
    title: "Авторизация",
    login: "Логин",
    password: "Пароль",
    button: "Вход",
    reg_link: "Ещё не зарегистрированы?",
    error: "Ошибка ошибка ошибка",
  };
  const content = parseTemplate(template, values);
  return { pageTitle: values.pageTitle, content: content };
};

export default signInPage;
