import Handlebars from 'handlebars';
import './avatar.scss';

export const Avatar = ({url}) => Handlebars.compile(`<img class='avatar' src='${url}' alt='' />`)();
