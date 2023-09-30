import './main.scss';
import Handlebars from 'handlebars';
import { tmpl } from './main.tmpl.js';

// Layouts
import { Navbar } from '../../layouts/Navbar';

export const Main = (props) => {
  return Handlebars.compile(tmpl)({ ...props, navbar: Navbar() });
};
