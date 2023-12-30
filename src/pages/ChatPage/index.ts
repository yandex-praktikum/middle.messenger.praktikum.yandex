import Block from '../../utils/Block'
import template from './chatPage.hbs'
import { submitValidation } from '../../utils/validation'
import './chat.scss'

export default class ChatPage extends Block {
	constructor() {
		super({
			events: {
				submit: submitValidation,
			},
			dialogs: [
				{
					src_avatar: '../../public/images/photo_missed.jpg',
					name: 'Irina',
					last_message: 'I love you',
					message_time: '22:55',
					message_count: 1,
				},
				{
					src_avatar: '../../public/images/photo_missed.jpg',
					name: 'Irina',
					last_message: 'I love you',
					message_time: '22:55',
					message_count: 2,
				},
			],
			src_avatar: '../../public/images/photo_missed.jpg',
			name: 'Irina',
			message_date: '22 December',
			messages: {
				sent_message: 'How are you?',
				arrived_message: 'I love you so much',
			},
		})
	}
	render() {
		return this.compile(template, this.props)
	}
}
