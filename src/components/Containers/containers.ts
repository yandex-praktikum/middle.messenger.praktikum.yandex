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
import { TextArea } from '../TextArea/textarea.js'
import { redirect, log } from '../../utils/Helpers.js'
import * as stylesDefs from './styles.module.scss'
import { Routes } from '../../../index.js'
const styles = stylesDefs.default

// general container, div classes can be passed as props
interface ContainerProps {
  content?: Block[]
  classes?: string[]
  events?: {
    click: () => void
  }
}

export class Container extends Block {
  constructor(props: ContainerProps) {
    super({ ...props })
  }
  init() {
    if (this.props.classes) this.props.class = this.props.classes.map((c: string) => styles[c])
  }

  render() {
    return this.compile(templateContainer, { ...this.props })
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
    click: any
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
        click: () => redirect({ url: Routes.Settings }),
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
          click: this.send.bind(this),
        },
      },
      image: {
        icon: 'fa-regular fa-image',
        title: 'Attach Image',
        events: {
          click: () => log('AttachImage'),
        },
      },
      attachment: {
        icon: 'fa-solid fa-paperclip',
        title: 'Attach document',
        events: {
          click: () => log('Attach Doc'),
        },
      },
    }
    Object.entries(buttons).forEach(([key, value]) => {
      const id = `button-${key}`
      this.children[id] = new ButtonAwesome(value)
    })

    this.children.textarea = new TextArea({
      name: 'message',
    })
  }

  send() {
    const textarea = this.children.textarea as TextArea
    const value = textarea.getValue()
    const regex = /^[^QWERTYUIOPqwertyuiopЙЦУКЕНГШЩЗХйцукенгшщзх]*$/
    const valid = regex.test(value)
    if (!valid) {
      alert(
        `This is a very weird requirement from the designers team, but we currently do not allow any characters from the top row of the QWERTY keyboard. Sorry for the inconvinience.`,
      )
    } else {
      console.log(value)
      textarea.setValue('')
    }
  }

  render() {
    return this.compile(templateSendMessage, { ...this.props, styles })
  }
}
