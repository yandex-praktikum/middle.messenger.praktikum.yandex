import Handlebars from 'handlebars';
import profile from './profileEdit.hbs?raw';

export const profileEditTemplate = ((props = {}) => {
    return Handlebars.compile(profile)(props)
})
