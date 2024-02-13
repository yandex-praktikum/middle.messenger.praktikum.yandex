import Handlebars from 'handlebars';
import profile from './profileEditPassword.hbs?raw';

export const profileEditPasswordTemplate = ((props = {}) => {
    return Handlebars.compile(profile)(props)
})
