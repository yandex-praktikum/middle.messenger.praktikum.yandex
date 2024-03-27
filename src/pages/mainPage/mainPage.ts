import Block from '../../core/Block'
import ChatItem from '../../components/chatItem/chatItem'
import { mockChatItems, mockMessages, userdata } from '../../mockData'
import { Chat } from '../../components/chat/chat'
import './mainPage.css'

// language=hbs
const MainPageTemplate = `
  <div class="main">
    <div class="sidebar">
      <div class="sidebar__top-block">
        <a class="link link_gray" href="#profile">Профиль></a>
        <input type="text" class="input-round" />
      </div>
      
      {{{ chatItems }}}
    </div>
    
    {{{ chat }}}
  </div>
`

type MainPageProps = {
  chatItems: ChatItem[]
  chat: Chat
}

export class MainPage extends Block {
  constructor(props: MainPageProps) {
    super(props)
  }

  render() {
    return this.compile(MainPageTemplate, this.props)
  }
}

export const mainPage = new MainPage({
  chatItems: mockChatItems,
  chat: new Chat({
    user: userdata,
    messages: mockMessages,
  }),
})
