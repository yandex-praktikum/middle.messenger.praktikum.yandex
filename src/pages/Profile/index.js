import Handlebars from 'handlebars';
import { tmpl } from './profile.tmpl.js';

// Components
import {Navbar} from "../../layouts/Navbar/index.js";

export const Profile = (props) => {
    return Handlebars.compile(tmpl)({...props, navbar: Navbar()})
};
