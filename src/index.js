import templateFunction from './templates/app.hbs';
import authPage from './templates/pages/auth/auth.js';

// import './styles/var.scss';
import './templates/app.scss';
import button from './templates/ui/button/button.js';
import form from './templates/ui/form/form.js';

let sidebar = '';
let page = authPage;

document.body.innerHTML = templateFunction({ sidebar, page });

