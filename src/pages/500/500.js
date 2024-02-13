import Handlebars from 'handlebars';
import error_500 from './500.hbs?raw';
import './500.scss';

export const error_500Template = (props = {}) => {
    return Handlebars.compile(error_500)(props)
}