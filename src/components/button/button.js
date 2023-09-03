import './button.sass'
import Handlebars from "handlebars";
import data from '../../data.json';

// Helper returns button data by name from data.json file
Handlebars.registerHelper('getButton', function (name) {
    return data['buttons'] && data['buttons'][name];
})

export { default as Button } from './button.hbs?raw';
