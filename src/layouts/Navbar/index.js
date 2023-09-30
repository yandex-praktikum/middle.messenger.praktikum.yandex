import './navbar.scss';
import Handlebars from 'handlebars';
import { tmpl } from './navbar.tmpl.js';
import { links } from '../../data/links.js';

// Components
import { Link } from '../../components/link';

export const Navbar = (props) => {
  const tmplLinks = links.map((link) => Link(link));

  return Handlebars.compile(tmpl)({ ...props, tmplLinks });
};
