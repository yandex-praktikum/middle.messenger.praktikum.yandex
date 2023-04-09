import Login from '../src/pages/login/Login.js'
import Registration from '../src/pages/registration/Registration.js'
import ChatList from '../src/pages/chatList/ChatList.js'
import ChatPage from '../src/pages/chatPage/ChatPage.js'
import Profile from '../src/pages/profile/Profile.js'
import ProfileEdit from '../src/pages/profileEdit/ProfileEdit.js'
import ProfilePassword from '../src/pages/profilePassword/ProfilePassword.js'
import ClientError from '../src/pages/clientError/ClientError.js'
import ServerError from '../src/pages/serverError/ServerError.js'

export const routes = [
  { path: '/', component: Login},
  { path: '/login', component: Login},
  { path: '/registration', component: Registration},
  { path: '/chat-list', component: ChatList},
  { path: '/chat-page', component: ChatPage},
  { path: '/profile', component: Profile},
  { path: '/profile-edit', component: ProfileEdit},
  { path: '/profile-password', component: ProfilePassword},
  { path: '/client-error', component: ClientError},
  { path: '/server-error', component: ServerError},
];
