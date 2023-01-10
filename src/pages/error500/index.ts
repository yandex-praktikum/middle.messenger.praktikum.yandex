import parseTemplate from "../../components/parse-template";
import { template } from "../error404/template";
import "../error404/styles.scss";

const error500Page = () => {
  const values = {
    pageTitle: "Ошибка 500",
    title: "Ошибка 500",
    text: "Ошибка сервера, попробуйте зайти позже",
    link: "Назад к чатам",
  };
  const content = parseTemplate(template, values);
  return { pageTitle: values.pageTitle, content: content };
};

export default error500Page;
