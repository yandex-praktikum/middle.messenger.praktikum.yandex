import './input.sass'
import Handlebars from "handlebars";
import data from '../../data.json';

// Helper returns input data by name from data.json file
Handlebars.registerHelper('getInput', function (name) {
    return data['input'] && data['input'][name];
})

export { default as Input } from './input.hbs?raw';
