import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import '../../../src/styles/style.scss';
import './style.scss';
import img from '../../images/chat.svg';
import iconButton from '../../components/iconButton';
import search from '../../components/search';
import convertDate from '../../utils/convertDate';
import showNewMessageCount from './utils/showNewMessageCount';
import userConfig from '../../config/user';
import data from './data';

Handlebars.registerHelper('convertDate', convertDate);
Handlebars.registerHelper('messageCount', showNewMessageCount);
const comp = Handlebars.compile(tpl);

const res = comp({
  user: userConfig,
  chats: data.chats,
  profileButton: iconButton('profile'),
  menuButton: iconButton('menu'),
  search: search('search-chats'),
  img: img, 
});

document.getElementById('app').innerHTML = res;