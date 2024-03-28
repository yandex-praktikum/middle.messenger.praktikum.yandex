import { setupPartials } from './src/shared/ui';

// import { Button } from './src/shared/ui/button';
import { Login } from './src/pages/login';
import './style.scss';

setupPartials();

import Handlebars from 'handlebars';
// const data = { type: 'submit', text: 'asd' };
console.log(Login);

const data = {
    text: 'Logiiiiin',
};

const a = Handlebars.compile(Login)(data);

document.getElementById('app').innerHTML = a;
