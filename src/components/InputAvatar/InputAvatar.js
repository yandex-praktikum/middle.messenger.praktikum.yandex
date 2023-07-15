import Handlebars from 'handlebars';
import './inputAvatar.scss';

export const InputAvatar = ({
                          type = 'file',
                          name = 'name'
                      }) => Handlebars.compile(`<label class="avatar__load"><input type='${type}' name='${name}' accept="image/*"' /></label>`)();
