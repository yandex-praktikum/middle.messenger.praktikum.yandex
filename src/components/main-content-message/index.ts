import Block from '../../utils/block'

const ChatMessages = new Block('.main-content__chat-area')

class Messages extends Block {
	render(): void {
		const isMyMessage = this.props.getProperty('my') as boolean
		if (isMyMessage) {
			this.element.classList.add('is-my-message')
		}

		const status = this.findChild('.status')
		const readedStatus = this.props.getProperty('readed') as boolean
		if (status && readedStatus) {
			status.classList.add('visible')
		}

		const messageType = this.props.getProperty('type')
		const img = this.findChild('.chat-message__image') as HTMLImageElement
		if (messageType === 'image' && img) {
			const imageSrc = this.props.getProperty('image')

			if (imageSrc) {
				img.src = `${imageSrc}`
			}
		}
	}
}

type Message = {
	my: boolean,
	readed: boolean,
	type: 'text' | 'image'
	text?: string,
	image?: string,
	time: string
}

const messagesList: Message[] = [
	{
		my: false,
		readed: true,
		type: 'text',
		text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
		time: '11:56'
	},
	{
		my: false,
		readed: false,
		type: 'image',
		image: '',
		time: '11:56'
	},
	{
		my: true,
		readed: true,
		type: 'text',
		text: 'Круто!',
		time: '12:00'
	}
]

messagesList.forEach(msg => {
	const messageBlock = new Messages(`.chat-${msg.type}__message`, msg, ChatMessages)
	messageBlock.bindPropsToElements({
		text: '.chat-message__text',
		time: '.chat-message__time'
	})
})

export { ChatMessages }