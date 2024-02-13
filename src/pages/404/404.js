import Handlebars from 'handlebars';
import error_404 from './404.hbs?raw';
import './404.scss';

export const error_404Template = (props = {}) => {
    return Handlebars.compile(error_404)(props)
}