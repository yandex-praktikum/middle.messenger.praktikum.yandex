import Block from '../../utils/block'

class Popup extends Block {
	init(): void {
		
		const modal = this.findChild('.modal')
		if (modal) {
			modal.addEventListener('click', ev => ev.stopPropagation())
		}

		const component = this
		this.element.addEventListener('click', () => {
			component.hide()
		})

		const closeLinkEl = this.findChild('.cancel')
		if (closeLinkEl) {
			closeLinkEl.addEventListener('click', () => {
				component.hide()
			})
		}
	}
}

export const popup = new Popup('.popup')

popup.bindPropsToElements({ buttonValue: 'button', title: '.title' })
