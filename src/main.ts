import Handlebars from 'handlebars';
import * as Components from './Components';
import * as Pages from './Pages';
import * as Widgets from './Widgets';
import * as Features from './Features';
import * as Icons from './Icons';

const pages = {
  signIn: [Pages.SignIn],
  signUp: [Pages.SignUp],
  chat: [
    Pages.Chat,
    {
      currentChat: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        alt: 'icon',
        title: 'час суда час туда',
        messages: [
          {
            sender: 'me',
            type: 'default',
            message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
            readed: true,
            created_time: '01.12.23',
          },
          {
            sender: 'you',
            type: 'default',
            message: 'Привет',
            readed: false,
            created_time: '07.12.23',
          },
        ],
      },
      chats: [
        {
          src: 'https://habrastorage.org/webt/qd/ex/p9/qdexp9td-qnebatzzddqp60y7qi.jpeg',
          alt: 'фон',
          title: 'Чат пацанов',
          lastMessage: 'Пока Пока Пока ПокаПокаПокаПокаПокаПока Пока Пока',
          time: '12:23',
          messagesCount: '2',
        },
      ],
    },
  ],
  notFount: [Pages.NotFound],
  serverError: [Pages.ServerError],
  addUser: [Pages.AddUser],
  removeUser: [Pages.RemoveUser],
  loadAvatar: [Pages.LoadAvatar],
  changePassword: [Pages.ChangePassword],
  userProfile: [Pages.UserProfile, { name: 'Ivan' }],
  nav: [
    Pages.Nav,
    {
      pages: [
        'signIn',
        'signUp',
        'chat',
        'notFount',
        'serverError',
        'addUser',
        'removeUser',
        'loadAvatar',
        'userProfile',
        'changePassword',
      ],
    },
  ],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Widgets).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Icons).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Features).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
