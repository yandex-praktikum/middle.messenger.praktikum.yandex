import Button from '@/components/button/button.ts'
import { ChatWindow } from '@/components/chat/chat'
import ChatItem from '@/components/chatItem/chatItem.ts'
import { routes } from '@/constants/routes.ts'
import { Chat } from '@/constants/types.ts'
import { AuthController } from '@/controllers/AuthController.ts'
import { ChatController } from '@/controllers/ChatController.ts'
import Block, { Props } from '@/core/Block'
import store from '@/core/Store.ts'
import { mockMessages } from '@/mockData'
import router from '@/router.ts'
import { withChats } from '@/utils/connect.ts'
import './messengerPage.css'

// language=hbs
const MessengerPageTemplate = `
  <div class="messenger">
    <div class="sidebar">
      <div class="sidebar__top-block">
        {{{ profileBtn }}}
        <input type="text" class="input-round" />
      </div>
      
      {{{ chats }}}
    </div>
    
    {{{ chat }}}
  </div>
`

type MessengerPageProps = {
  profileBtn: Button
  chat: ChatWindow
} & Props

const authController = new AuthController()
const chatController = new ChatController()

export class MessengerPage extends Block {
  chats: ChatItem[]

  constructor(props: MessengerPageProps) {
    super(props)
    this.chats = []
  }

  createChatItems(chats: Chat[]) {
    return this.chats = chats.map((chat) => new ChatItem(chat))
  }

  componentDidMount() {
    authController.getUser().then((resp) => {
      if (resp.status === 401) {
        router.go(routes.login)
      } else {
        chatController.getChats().then(() => {
          this.createChatItems(store.getState().chats)
        })
      }
    })
  }

  render() {
    return this.compile(MessengerPageTemplate, this.props)
  }
}

const connectedMessengerPage = withChats(MessengerPage)

export const messengerPage = new connectedMessengerPage({
  profileBtn: new Button({
    label: 'Профиль>',
    className: 'button-icon back-btn',
    events: {
      click: () => {
        router.go(routes.profile)
      },
    },
  }),
  chat: new ChatWindow({
    user: store.getState().userdata,
    messages: mockMessages,
  }),
})
