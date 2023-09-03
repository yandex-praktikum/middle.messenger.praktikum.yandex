import './Buttons.scss';

// language=hbs
export default `
  <button class='link-button{{# if class }} {{ class }}{{/ if }}'>{{ title }}</button>
`;
