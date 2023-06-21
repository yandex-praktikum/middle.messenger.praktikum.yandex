import Block from '../../utils/Block.js'
import { template } from './rightPanel.templ.js'

import { findIndexByKeyValue, parseDate } from '../../utils/Helpers.js'
import { rmbTemplate, lmbTemplate } from '../../components/MessagesChats/messageBalloon.templ.js'
import { MessageBalloon } from '../../components/MessagesChats/messageBalloon.js'

type messagesData = {
  author: string
  avatar: string
  date: string
  message: string
}
interface RightPanelProps {
  // avatar: string
  // display_name?: string
  data: messagesData []
}

export class RightPanel extends Block<RightPanelProps> {
  constructor(props: RightPanelProps) {
    super({ ...props })
  }

  init() {
    // messages
    const messagesData = this.props.data
    this.children.messages = this.props.data.map((m, i) => {
      const { author, avatar, message, date } = m
      let prevAuthor = author
      let hideAvatar = false
      if (i < messagesData.length - 1) {
        prevAuthor = messagesData[i + 1].author
      }
      prevAuthor == author && hideAvatar

      if (author === 'You') {
        return new MessageBalloon({
          template: rmbTemplate,
          author,
          avatar,
          hideAvatar,
          message,
          date: parseDate(date),
        })
      }
      return new MessageBalloon({
        template: lmbTemplate,
        author,
        avatar,
        hideAvatar,
        message,
        date: parseDate(date),
      })
    })
    // .join(' ')
    // console.log(this.children.messages)
  }

  render() {
    // return this.compile(template, { ...this.props, styles })
    return this.compile(template, { ...this.props })
  }
}

// if (name) {

//     const topAvatarContainer = avatarContainerTemplate({
//       display_name,
//       avatar,
//       selected: true,
//       n: 0,
//     });

//     return Handlebars.compile(template)({
//       buttons,
//       leftPaneChats,
//       rightPanelMessages,
//       topAvatarContainer,
//     });
//   }

//   const noMessages = Handlebars.compile('<p>Select a chat to see the messages</p>')()
//   return Handlebars.compile(template)({
//     buttons,
//     leftPaneChats,
//     noMessages
//   });
