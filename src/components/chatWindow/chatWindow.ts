import Avatar from '@/components/avatar/avatar.ts'
import Button from '@/components/button/button.ts'
import Input from '@/components/input/input.ts'
import { MessageItem, MessageItemProps } from '@/components/message/message.ts'
import { Modal } from '@/components/modal/modal.ts'
import { Chat, User } from '@/constants/types.ts'
import { ChatController } from '@/controllers/ChatController.ts'
import Block, { Props } from '@/core/Block'
import store from '@/core/Store.ts'
import connect from '@/utils/connect.ts'
import connectToMessageSocket from '@/utils/connectToMessageSocket.ts'
import getResourceURL from '@/utils/getResourceURL.ts'
import './chatWindow.css'

// language=hbs
const ChatTemplate: string = `
  <div class="chat">
    {{#if selectedChat}}
      <div class="chat__header">
        {{{ avatar }}}

        <span>{{ title }}</span>

        <div class="chat-menu">
          <i class="lni lni-menu"></i>
          <div class="chat-menu__actions">
            {{{ addUserBtn }}}
            {{{ deleteUserBtn }}}
            {{{ deleteChatBtn }}}
          </div>
        </div>
      </div>


      <div class="chat__messages">
        {{{ messages }}}
      </div>


      <div class="chat__input-block">
        <button class="button-icon">
          <i class="lni lni-paperclip"></i>
        </button>
        {{{ messageInput }}}
        <button class="button-icon send-btn">
          <i class="lni lni-arrow-left"></i>
        </button>
      </div>
    {{/if}}
  </div>
`

type ChatWindowProps = {
  selectedChat: number
} & Props

const chatController = new ChatController()

export class ChatWindow extends Block {
  private socket: WebSocket | null = null
  private chat: Chat | null = null
  private modal: Modal
  private isChatAdmin: boolean = false

  constructor(props: ChatWindowProps) {
    super(props)

    this.modal = new Modal()
    this.children.addUserBtn = new Button({
      label: '<i class="lni lni-plus"></i>Добавить пользователя',
      className: 'chat-menu__action',
      withId: true,
      events: {
        click: () => {
          this.showAddUserModal()
        },
      },
    })
    this.children.deleteUserBtn = new Button({
      label: '<i class="lni lni-trash-can"></i>Удалить пользователя',
      className: 'chat-menu__action',
      withId: true,
      events: {
        click: () => {
          this.showDeleteUserModal()
        },
      },
    })
    this.children.deleteChatBtn = new Button({
      label: '<i class="lni lni-close"></i>Удалить чат',
      className: 'chat-menu__action',
      withId: true,
      events: {
        click: () => {
          if (this.chat) {
            chatController.deleteChat(this.chat.id)
          }
        },
      },
    })

    this.isChatAdmin = this.checkUserIsChatAdmin()
  }

  checkUserIsChatAdmin() {
    if (this.props.chatUsers && Array.isArray(this.props.chatUsers)) {
      const user = this.props.chatUsers.filter((user: User) => {
        return user.id === store.getState().userdata.id
      })[0]

      const element = this.children.deleteChatBtn.element as HTMLElement

      if (user && user.role !== 'admin') {
        element.style.display = 'none'
      } else {
        element.style.display = 'flex'
      }

      return user && user.role === 'admin'
    } else {
      return false
    }
  }

  uploadChatAvatarHandler(isChatAdmin: boolean) {
    if (!isChatAdmin) {
      return
    }

    const fileInput = document.createElement('input')
    fileInput.type = 'file'

    fileInput.onchange = async (e: Event) => {
      if (
        e.currentTarget instanceof HTMLInputElement &&
        e.currentTarget.files
      ) {
        const formData = new FormData()

        formData.append('avatar', e.currentTarget.files[0])
        formData.append('chatId', `${store.getState().selectedChat}`)

        chatController.uploadChatAvatar(formData).then(() => {
          chatController.getChats().then(() => {
            this.chat = store
              .getState()
              .chats.filter((chat) => chat.id === this.props.selectedChat)[0]

            if (this.chat) {
              this.setProps({ currentChat: { ...this.chat, src: this.chat.avatar } })
            }
          })
        })
      }
    }

    fileInput.click()
  }

  updateChatAvatar(chat: Chat) {
    this.children.avatar = new Avatar({
      src: chat.avatar ? getResourceURL(chat.avatar) : '',
      alt: chat.avatar ? (this.props.title as string) : '',
      size: '40px',
      withId: true,
      canChange: this.isChatAdmin,
      events: {
        click: () => {
          this.uploadChatAvatarHandler(this.isChatAdmin)
        },
      },
    })
  }

  createSocket() {
    const userId = store.getState().userdata.id
    const chatId = store.getState().selectedChat

    connectToMessageSocket(userId, chatId).then((resp) => {
      if (resp !== undefined) {
        this.socket = resp
        chatController.getChatUsers(chatId)

        this.chat = store
          .getState()
          .chats.filter((chat) => chat.id === this.props.selectedChat)[0]

        this.props.title = this.chat.title
        this.updateChatAvatar(this.chat)

        this.children.messageInput = new Input({
          type: 'text',
          name: 'message',
          label: '',
          placeholder: 'Сообщение...',
          className: 'message-label',
          classNameInput: 'message-input',
          events: {
            keyup: (event) => {
              if (
                event instanceof KeyboardEvent &&
                event.target instanceof HTMLInputElement &&
                event.key === 'Enter'
              ) {
                const message = { content: event.target.value, type: 'message' }
                this.socket?.send(JSON.stringify(message))
                event.target.value = ''
              }
            },
          },
        })
      }
    })
  }

  showAddUserModal() {
    const content = document.createElement('div')
    const input = new Input({
      type: 'text',
      label: 'ID юзера',
      placeholder: 'ID...',
      name: 'id',
    })
    const btn = new Button({
      label: 'Добавить',
      className: 'button input-submit',
      events: {
        click: () => {
          chatController.addUserToChat({
            users: [Number(input.getValue())],
            chatId: Number(this.props.selectedChat),
          })
          this.closeModal()
        },
      },
    })

    content.appendChild(input.element)
    content.appendChild(btn.element)

    this.modal.setContent('Добавить пользователя', content)
    this.modal.open()
  }

  showDeleteUserModal() {
    const content = document.createElement('div')
    content.className = 'users'
    ;(this.props.chatUsers as User[]).map((user: User) => {
      const userBlock = document.createElement('div')
      const userLogin = document.createElement('span')
      const deleteBtn = document.createElement('button')

      userBlock.className = 'user'
      userLogin.innerHTML = `<span>${user.login}</span>`
      userLogin.className = 'user__login'
      deleteBtn.innerHTML = `&#9746;`
      deleteBtn.className = 'user__delete-btn'
      deleteBtn.addEventListener('click', () => {
        chatController.deleteUserFromChat({
          users: [user.id],
          chatId: Number(this.props.selectedChat),
        })
        this.closeModal()
      })

      userBlock.appendChild(userLogin)
      userBlock.appendChild(deleteBtn)

      content.appendChild(userBlock)
    })

    this.modal.setContent('Удалить пользователя', content)
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }

  showMessages(messages: MessageItemProps[]) {
    return messages.map((message) => {
      return new MessageItem({
        ...message,
        isMy: message.user_id === store.getState().userdata.id,
        user: store
          .getState()
          .chatUsers.filter((user) => user.id === message.user_id)[0],
      })
    })
  }

  componentDidUpdate(oldProps: Props, newProps: Partial<Props>): boolean {
    if (this.socket && oldProps.selectedChat !== newProps.selectedChat) {
      this.socket.close()
    }
    if (oldProps.selectedChat !== newProps.selectedChat) {
      this.createSocket()
    }

    this.blockArrays.messages = this.showMessages(store.getState().messages)
    this.isChatAdmin = this.checkUserIsChatAdmin()

    if (newProps.currentChat) {
      this.updateChatAvatar(newProps.currentChat as Chat)
    }

    return super.componentDidUpdate(oldProps, newProps)
  }

  render() {
    return this.compile(ChatTemplate, this.props)
  }
}

export const chatWindow = connect((state) => ({
  selectedChat: state.selectedChat,
  messages: state.messages,
  chatUsers: state.chatUsers,
  currentChat: state.currentChat,
}))(ChatWindow)
