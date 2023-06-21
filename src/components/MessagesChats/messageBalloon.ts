import Block from '../../utils/Block'

interface MessageBallonProps {
  template: (context: any) => string
  author: string
  avatar: string
  hideAvatar: boolean
  message: string
  date: string
}

export class MessageBalloon extends Block<MessageBallonProps> {
  constructor(props: MessageBallonProps) {
    super({ ...props })
  }

  render() {
    const { template, ...props } = this.props
    return this.compile(template, { ...props })
  }
}
