import { PluginOption } from "vite";
import pug from "pug";

export default function pugPrecompile(): PluginOption {
  const fileRegexp = /\.pug$/;

  return {
    name: 'vite-plugin-pug-precompile',
    transform(src, id) {
      if (fileRegexp.test(id)) {
        const code = `
         ${pug.compileClient(src)};
         export default template;
        `;

        return { code }
      }

      return undefined;
    },
  }
}
