import Handlebars from 'handlebars';
import profile from './profile.hbs?raw';
import './profile.scss';

export const profileTemplate = ((props = {}) => {
    return Handlebars.compile(profile)(props)
})
