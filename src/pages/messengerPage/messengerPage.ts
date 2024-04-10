import Block from '@/core/Block'
import router from '@/router.ts'
import { routes } from '@/constants/routes.ts'
import ChatItem from '@/components/chatItem/chatItem'
import { mockChatItems, mockMessages } from '@/mockData'
import { Chat } from '@/components/chat/chat'
import Button from '@/components/button/button.ts'
import './messengerPage.css'
import { AuthController } from '@/controllers/AuthController.ts'
import store from '@/core/Store.ts'

// language=hbs
const MessengerPageTemplate = `
  <div class="messenger">
    <div class="sidebar">
      <div class="sidebar__top-block">
        {{{ profileBtn }}}
        <input type="text" class="input-round" />
      </div>
      
      {{{ chatItems }}}
    </div>
    
    {{{ chat }}}
  </div>
`

type MessengerPageProps = {
  profileBtn: Button
  chatItems: ChatItem[]
  chat: Chat
}

const authController = new AuthController()

export class MessengerPage extends Block {
  constructor(props: MessengerPageProps) {
    super(props)
  }

  render() {
    return this.compile(MessengerPageTemplate, this.props)
  }

  componentDidMount() {
    authController.getUser()
  }
}

export const messengerPage = new MessengerPage({
  profileBtn: new Button({
    label: 'Профиль>',
    className: 'button-icon back-btn',
    events: {
      click: () => {
        router.go(routes.profile)
      },
    },
  }),
  chatItems: mockChatItems,
  chat: new Chat({
    user: store.getState().userdata,
    messages: mockMessages,
  }),
})
