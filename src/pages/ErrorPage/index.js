import './errorPage.scss';
import Handlebars from 'handlebars';
import { tmpl } from './errorPage.tmpl.js';

// Components
import { Navbar } from '../../layouts/Navbar/index.js';
import { Link } from '../../components/link/index.js';

export const ErrorPage = (props) => {
  return Handlebars.compile(tmpl)({ ...props, link: Link({ text: props.text }) });
};
