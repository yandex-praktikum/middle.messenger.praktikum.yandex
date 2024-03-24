import Block from '../../core/Block'
import ChatItem from '../../components/chatItem/chatItem'
import { default as mockData } from './mockData'
import './mainPage.css'

// language=hbs
const MainPageTemplate = `
  <div class="main">
    <div class="sidebar">
      {{{ chatItems }}}
    </div>
    <div class="chat">{{{ kek }}}</div>
  </div>
`

type MainPageProps = {
  chatItems: ChatItem[]
  kek: string
}

export class MainPage extends Block {
  constructor(props: MainPageProps) {
    super(props)
    setTimeout(()=> {
      this.setProps({kek: 'her'})
    }, 3000)
  }

  render() {
    console.log(this)
    return this.compile(MainPageTemplate, this.props)
  }
}

export const mainPage = new MainPage({
  chatItems: mockData,
  kek: 'lol',
})
