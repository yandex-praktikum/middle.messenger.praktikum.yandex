import Block from '../../utils/block'

class ChatInputAreaClass extends Block {
	init(): void {
		const trigger = this.findChild('.attach') as HTMLElement
		if (trigger) {
			trigger.addEventListener('click', function() {
				this.classList.toggle('open')
			})
		}
	}
}

export const MainContentInput = new ChatInputAreaClass('.main-content__input')