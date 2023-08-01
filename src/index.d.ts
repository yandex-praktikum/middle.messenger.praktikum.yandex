declare module '*.hbs' {
  const tpl: (param?: unknown) => string;
  export default tpl;
}
