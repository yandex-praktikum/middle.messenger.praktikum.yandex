import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
    'signin': [ Pages.SignInPage, ],
    'signup': [ Pages.SignUpPage,  ],
    'messenger': [ Pages.Messenger,  ],
    'error': [ Pages.ErrorPage,  ],
};

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
    //temp nav bar
    //@ts-ignore
    document.getElementById('nav').innerHTML = Handlebars.compile(Components.Navigator)(null);

    //@ts-ignore
    const [ source, context ] = pages[page];
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('messenger'));

document.addEventListener('click', e => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
