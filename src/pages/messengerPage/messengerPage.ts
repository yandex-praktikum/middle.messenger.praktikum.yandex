import Button from '@/components/button/button.ts'
import ChatItem from '@/components/chatItem/chatItem.ts'
import { ChatWindow, chatWindow } from '@/components/chatWindow/chatWindow.ts'
import Input from '@/components/input/input.ts'
import { Modal } from '@/components/modal/modal.ts'
import { routes } from '@/constants/routes.ts'
import { Chat } from '@/constants/types.ts'
import { AuthController } from '@/controllers/AuthController.ts'
import { ChatController } from '@/controllers/ChatController.ts'
import Block, { Props } from '@/core/Block'
import store from '@/core/Store.ts'
import router from '@/router.ts'
import connect from '@/utils/connect.ts'
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
      {{{ createChatBtn }}}
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
  private modal: Modal

  constructor(props: MessengerPageProps) {
    super(props)
    this.modal = new Modal()
    this.children.createChatBtn = new Button({
      label: '<i class="lni lni-plus" />',
      className: 'create-chat-btn',
      withId: true,
      events: {
        click: () => {
          this.showCreateChatModal()
        },
      },
    })
  }

  showCreateChatModal() {
    const content = document.createElement('div')
    const input = new Input({
      type: 'text',
      label: 'Название чата',
      placeholder: 'Название...',
      name: 'create-chat'
    })
    const btn = new Button({
      label: 'Создать чат',
      className: 'button input-submit',
      events: {
        click: () => {
          chatController.createChat(input.getValue())
          this.modal.close()
        }
      }
    })

    content.appendChild(input.element)
    content.appendChild(btn.element)

    this.modal.setContent('Создать чат', content);
    this.modal.open();
  }

  createChatItems(chats: Chat[]) {
    return chats.map((chat) => new ChatItem(chat))
  }

  componentDidMount() {
    authController.getUser().then((resp) => {
      if (resp.status === 401) {
        router.go(routes.login)
      } else {
        chatController.getChats()
      }
    })
  }

  componentDidUpdate(oldProps?: Props, newProps?: Partial<Props>): boolean {
    this.blockArrays.chats = this.createChatItems(store.getState().chats)
    return super.componentDidUpdate(oldProps, newProps)
  }

  render() {
    return this.compile(MessengerPageTemplate, this.props)
  }
}

export const withChats = connect((state) => ({
  chats: state.chats,
}))(MessengerPage)

export const messengerPage = new withChats({
  profileBtn: new Button({
    label: 'Профиль>',
    className: 'button-icon back-btn',
    events: {
      click: () => {
        router.go(routes.profile)
      },
    },
  }),
  chat: new chatWindow({
    selectedChat: store.getState().selectedChat,
  }),
})
