import templateFunction from './templates/app.hbs';
import regPage from './templates/pages/reg/reg.js';

// import './styles/var.scss';
import './templates/app.scss';
import button from './templates/ui/button/button.js';
import form from './templates/ui/form/form.js';

let sidebar = '';
let page = regPage;

document.body.innerHTML = templateFunction({ sidebar, page });

