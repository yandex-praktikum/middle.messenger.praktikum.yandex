import Handlebars from 'handlebars';
import { tmpl } from './errorPage.tmpl.js';

// Components
import {Navbar} from "../../layouts/Navbar/index.js";

export const ErrorPage = (props) => {
    return Handlebars.compile(tmpl)({...props, navbar: Navbar()})
};
