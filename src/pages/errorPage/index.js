import './errorPage.scss';
import Handlebars from 'handlebars';
import { tmpl } from './errorPage.tmpl.js';

// Components
import { Link } from '../../components/link/index.js';

export const ErrorPage = (props) => {
  const combineProps = {
    link: Link({ text: props.redirectText, to: props.redirectTo }),
    ...props,
  };
  return Handlebars.compile(tmpl)(combineProps);
};
