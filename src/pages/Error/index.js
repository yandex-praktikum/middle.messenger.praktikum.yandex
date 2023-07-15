import Handlebars from 'handlebars';
import {templateNotFound} from './notFound.tmpl.js';
import {templateServer} from './serverError.tmpl.js';
import icon from '../../assets/icons/ocean-logo.svg';
import './notFound.scss';

export const ErrorPage = (server = false) => server ? Handlebars.compile(templateServer)({icon}) : Handlebars.compile(templateNotFound)({icon});
