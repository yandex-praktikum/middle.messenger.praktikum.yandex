import './chatting.scss';
import Handlebars from 'handlebars';
import { tmpl } from './chatting.tmpl.js';
import avatar from '../../images/placeholder-photo-icon.svg';

// Components

export const Chatting = (props) => {
  const additionalProps = {};

  const combineProps = {
    ...additionalProps,
    ...props,
    avatar,
  };

  return Handlebars.compile(tmpl)(combineProps);
};
