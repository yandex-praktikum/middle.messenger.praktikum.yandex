import * as Pages from '../../Pages';

const availablePages = [
  'signIn',
  'signUp',
  'addUser',
  'removeUser',
  'changePassword',
  'loadAvatar',
  'userProfile',
  'chat',
  'notFount',
  'serverError',
];

type ComponentType = (typeof Pages)[keyof typeof Pages];

const pages: Record<string, [ComponentType, Record<string, any>] | [ComponentType]> = {
  signIn: [Pages.SignInPage],
  signUp: [Pages.SignUpPage],
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
  userProfile: [Pages.UserProfile, { value: { first_name: 'Ivan' } }],
  addUser: [Pages.AddUser],
  removeUser: [Pages.RemoveUser],
  loadAvatar: [Pages.LoadAvatar],
  changePassword: [Pages.ChangePassword],
  nav: [
    // eslint-disable-next-line no-underscore-dangle
    Pages._Nav,
    {
      pages: availablePages.map(page => ({
        page,
        onClick: () => {
          // eslint-disable-next-line no-use-before-define
          navigate(page);
        },
      })),
    },
  ],
};

export function navigate(page: string) {
  const app = document.querySelector('#app');

  const [Block, props] = pages[page];
  const component = new Block(props);

  if (!app) return;

  app.innerHTML = '';
  app.append(component.getContent()!);
}
