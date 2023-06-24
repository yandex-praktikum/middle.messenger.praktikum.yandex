import Block from '../../utils/Block.js'
import { template } from './leftPanel.templ.js'
import { ContainerChat } from '../../components/Avatar/avatarContainer.js'
import { ChatContainer } from '../../components/Containers/containers.js'

// import { findIndexByKeyValue, parseDate } from '../../utils/Helpers.js'
// import { templateRm, templateLm } from '../../components/MessageBalloons/messageBalloon.templ.js'
// import { messageBalloon } from '../../components/MessageBalloons/messageBalloon.js'


let name = 'Noah'
console.log(name)

type chatData = {
  display_name: string
  selected: boolean
  avatar: string
  author: string
  message: string
  date: string
  newCount: number
}
interface LeftPanelProps {
  data: chatData []
}

export class LeftPanel extends Block<LeftPanelProps> {
  constructor(props: LeftPanelProps) {
    super({...props})
  }

  init() {

    this.children.chats = this.props.data.map((m) => new ChatContainer(m))
  }
  render() {
    console.log(this.props)
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}
