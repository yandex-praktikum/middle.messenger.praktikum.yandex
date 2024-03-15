import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'loginPage': [ Pages.LoginPage ],
  'registrationPage': [ Pages.RegistrationPage ],
  'profilePage': [ Pages.ProfilePage ],
  'editProfilePage': [ Pages.EditProfilePage ],
  'editPasswordPage': [ Pages.EditPasswordPage ],
  // 'chatsPage': [],
  'notFoundPage': [ Pages.NotFoundPage ],
  'errorPage': [ Pages.ErrorPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

const navigate = (page) => {
  const [ src, args ] = pages[page];
  const handlebarsFunc = Handlebars.compile(src);
  document.getElementById('app').innerHTML = handlebarsFunc(args);
}

document.addEventListener('DOMContentLoaded', (e) => {
  const path = e.target.location.pathname;

  switch (path) {
    case '/login': {
      navigate('loginPage');
      break;
    }
    case '/register': {
      navigate('registrationPage');
      break;
    }
    case '/profile': {
      navigate('profilePage');
      break;
    }
    case '/edit-profile': {
      navigate('editProfilePage');
      break;
    }
    case '/edit-password': {
      navigate('editPasswordPage');
      break;
    }
    case '/404': {
      navigate('notFoundPage');
      break;
    }
    case '/500': {
      navigate('errorPage');
      break;
    }

    default: {
      window.location.pathname = '/login';
    }
  }

});

document.addEventListener('click', (event) => {
  const page = event.target.getAttribute('page');

  if (page) {
    navigate(page);

    event.preventDefault();
    event.stopImmediatePropagation();
  }
});
