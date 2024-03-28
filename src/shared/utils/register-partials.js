import Handlebars from 'handlebars';

export function registerPartials(partials) {
    Object.entries(partials).forEach(([partialName, partialTemplate]) => {
        Handlebars.registerPartial(partialName, partialTemplate);
        console.log(partialName, partialTemplate);
    });
}
