import './mainPage.css'
import Block from '../../core/Block'

const MainPageTemplate = `
    <div class="main">
        <div class="sidebar"></div>
        <div class="chat">{{ kek }}</div>
    </div>
`

type MainPageProps = {
  kek: string
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
  kek: 'lol',
})
