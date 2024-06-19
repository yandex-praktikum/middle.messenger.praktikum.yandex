import Handlebars from "handlebars";
import * as Components from './components'
import * as Pages from './pages'

const pages = {
    'login': [ Pages.LoginPage ],
    'registration': [ Pages.RegistrationPage ],
    'profile': [ Pages.ProfilePage ],
    'chats': [ Pages.ChatsPage ],
    'page404': [ Pages.NotFoundPage],
    'page502': [ Pages.BadGatewayPage],
}

Object.entries(Components).forEach( ([ name, components]) => {
    Handlebars.registerPartial(name, components )
})

function navigate(page) {
    const [ source, args ] = pages[ page ];
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'))

document.addEventListener('click', e => {
    const page = e.target.getAttribute('page');
    if( page ) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
})
