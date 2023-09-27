import Handlebars from 'handlebars';
import { tmpl } from './signin.tmpl.js';

export const Signin = (props) => {
    return Handlebars.compile(tmpl)(props)
};
