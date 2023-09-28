import './login.scss';
import Handlebars from 'handlebars';
import { tmpl } from './login.tmpl.js';

// Components
import { Navbar } from '../../layouts/Navbar/index.js';

export const Login = (props) => {
  return Handlebars.compile(tmpl)({ ...props, navbar: Navbar() });
};
