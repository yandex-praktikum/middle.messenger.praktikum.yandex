import { modulesList } from "./modules-list";

const parseTemplate = (template: string, values: any) => {
  const tplRegularVariable = /\{\{(.*?)\}\}/g;
  const tplRegularModule = /\[\[(.*?)\]\]/g;
  const tplRegularModuleVariable = /\'(.*?)\'/;

  let match = null;
  let result = template;

  while ((match = tplRegularVariable.exec(template))) {
    const variableName = match[1].trim();
    if (!variableName) {
      continue;
    }
    const data = values[variableName];
    result = result.replace(match[0], data);
  }

  while ((match = tplRegularModule.exec(result))) {
    const tplRegularModuleName = /\[\[(.*?)\?/g;
    const moduleName = tplRegularModuleName.exec(match[0]);
    let data:string | (() => string) = "";
    if (moduleName && moduleName[1]) {
      const moduleVariables = match[0].split("&");
      const moduleValues: any = {};
      moduleVariables.map((cur, i) => {
        if (i > 0) {
          const key = cur.split("=")[0];
          const value = tplRegularModuleVariable.exec(cur);
          if (value) moduleValues[key] = value[1];
        }
      });
      data = modulesList(moduleName[1].trim(), moduleValues);
    }
    if (typeof data === "string") {
      result = result.replace(match[0], data);
    }
  }

  return result;
};

export default parseTemplate;
