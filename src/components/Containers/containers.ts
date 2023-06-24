import Block from '../../utils/Block'
import {
  templateBlank,
  templateContainer,
  templateScroller,
  templateChat,
  templateMessagesHeader,
  templateRm,
  templateLm,
  templateSendMessage,
} from './container.templ'
import { Avatar } from '../Avatar/avatar'
import { ButtonAwesome } from '../../components/Buttons/buttons.js'
import { Tag } from '../Tags/tags.js'
import { redirect, log } from '../../commonActions/actions.js'
import * as stylesDefs from './styles.module.scss'

const styles = stylesDefs.default

// general container, div classes can be passed as props
interface ContainerProps {
  content: Block[]
  classes?: string[]
  class?: any
  events?: {
    click: () => void
  }
}

export class Container extends Block<ContainerProps> {
  constructor(props: ContainerProps) {
    super({ ...props })
  }
  init() {
    if (this.props.classes) this.props.class = this.props.classes.map((c) => styles[c])
  }

  render() {
    return this.compile(templateContainer, { ...this.props })
  }
}

// scroller container for chats and messages
interface ContainerScrollerProps extends ContainerProps {
  class1?: string
  class2?: string
  scrollerClass?: string
  scrollerContainerClass?: string
}

export class ContainerScroller extends Block<ContainerScrollerProps> {
  constructor(props: ContainerScrollerProps) {
    super({ class1: 'scroller', class2: 'scroller-container', ...props })
  }
  init() {
    if (this.props.class1) this.props.scrollerClass = styles[this.props.class1]
    if (this.props.class2) this.props.scrollerContainerClass = styles[this.props.class2]
  }

  render() {
    return this.compile(templateScroller, { ...this.props })
  }
}

// container for chats in the left panel
interface ContainerChatProps {
  avatar: string
  display_name: string
  selected: boolean
  newCount?: number
  message?: string
  events?: {
    click: () => void
  }
}

export class ContainerChat extends Block<ContainerChatProps> {
  constructor(props: ContainerChatProps) {
    super({ ...props })
  }
  init() {
    this.children.avatar = new Avatar({
      title: this.props.display_name,
      src: this.props.avatar,
    })
  }

  render() {
    return this.compile(templateChat, { ...this.props, styles })
  }
}

// container for the header above messages in the rigth panel
export class ContainerMessagersHeader extends Block<ContainerChatProps> {
  constructor(props: ContainerChatProps) {
    super({ ...props })
  }
  init() {
    this.children.avatar = new Avatar({
      title: this.props.display_name,
      src: this.props.avatar,
    })
    this.children.button = new ButtonAwesome({
      icon: 'fa-solid fa-bars',
      title: 'Settings',
      // classes: ['profile-button'],
      events: {
        click: () => redirect({ url: '/settings' }),
      },
    })
  }

  render() {
    return this.compile(templateMessagesHeader, { ...this.props, styles })
  }
}

// container for messages in the right panel
interface ContainerMessageProps {
  messageTemplate?: (context: any) => string
  author: string
  avatar: string
  hideAvatar: boolean
  message: string
  date: string
}

export class ContainerMessage extends Block<ContainerMessageProps> {
  constructor(props: ContainerMessageProps) {
    super({ ...props })
  }

  init() {
    this.props.messageTemplate = this.props.author == 'You' ? templateRm : templateLm
  }

  render() {
    if (this.props.messageTemplate) {
      const { messageTemplate, ...props } = this.props
      return this.compile(messageTemplate, { ...props, styles })
    }
    return this.compile(templateBlank, { ...this.props, styles })
  }
}

// container for sendMessages
export class ContainerSendMessage extends Block {
  constructor() {
    super({})
  }

  init() {
    const buttons = {
      send: {
        icon: 'fa-regular fa-paper-plane',
        title: 'Send',
        classes: ['send-button'],
        events: {
          click: () => log({ message: 'Send' }),
        },
      },
      image: {
        icon: 'fa-regular fa-image',
        title: 'Attach Image',
        events: {
          click: () => log({ message: 'AttachImage' }),
        },
      },
      attachment: {
        icon: 'fa-solid fa-paperclip',
        title: 'Attach document',
        events: {
          click: () => log({ message: 'Attach Doc' }),
        },
      },
      // settings: {
      //   icon: 'fa-solid fa-bars',
      //   title: 'Settings',
      //   events: {
      //     click: () => redirect({ url: '/settings' }),
      //   },
      // },
    }

    Object.entries(buttons).forEach(([key, value]) => {
      const id = `button-${key}`
      this.children[id] = new ButtonAwesome(value)
    })
    console.log(this.children['button-send'])
    this.children.textarea = new Tag({
      tag: 'textarea',
      name: 'message',
    })
  }

  render() {
    return this.compile(templateSendMessage, { ...this.props, styles })
  }
}
