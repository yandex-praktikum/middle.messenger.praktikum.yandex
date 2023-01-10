import { link, linkProps } from "../link";
import { input, inputProps } from "../input";
import { tempNav } from "../tempNav";

type modulesProps = linkProps | inputProps;

export const modulesList = (title: string, moduleValues: modulesProps) => {
  switch (title) {
    case "link":
      return link(<linkProps>moduleValues);
    case "input":
      return input(<inputProps>moduleValues);
    case "temp_nav":
      return tempNav();
    default:
      return "";
  }
};
