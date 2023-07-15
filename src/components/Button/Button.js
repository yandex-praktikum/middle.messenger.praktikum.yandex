import Handlebars from 'handlebars';
import './button.scss';

export const Button = ({label, species='blue'}) => Handlebars.compile(`<button class='button button-${species}'>${label}</button>`)();
