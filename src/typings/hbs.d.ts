declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars'
  const template: TemplateDelegate
  export default template
}
