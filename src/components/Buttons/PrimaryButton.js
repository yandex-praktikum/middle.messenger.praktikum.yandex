import './Buttons.scss';

// language=hbs
export default `
  <button class='primary-button{{# if class }} {{ class }}{{/ if }}'>{{ title }}</button>
`;
