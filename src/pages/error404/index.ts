import parseTemplate from "../../components/parse-template";
import { template } from "./template";
import "./styles.scss";

const error404Page = () => {
  const values = {
    pageTitle: "Ошибка 404",
    title: "Ошибка 404",
    text: "Извините, такой страницы нет",
    link: "Назад к чатам",
  };
  const content = parseTemplate(template, values);
  return { pageTitle: values.pageTitle, content: content };
};

export default error404Page;
