import parseTemplate from "../../components/parse-template";
import { template } from "./template";
import "./styles.scss";

const homePage = () => {
  const values = {
    pageTitle: "Страница чатов",
    search_placeholder: "Поиск...",
    message_placeholder: "Сообщение..."
  };
  const content = parseTemplate(template, values);
  return { pageTitle: values.pageTitle, content: content };
};

export default homePage;
