import Handlebars from 'handlebars';
import './input.scss';

export const Input = ({
                          type = 'text',
                          name = 'name',
                          placeholder = '',
                          required = false
                      }) => Handlebars.compile(`<input class='input' type='${type}' name='${name}' placeholder='${placeholder}' />`)();
