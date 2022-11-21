import Block from '../../utils/block'
import { popup } from '../popup/index'

class DropMenu extends Block {
	init(): void {
		const trigger = this.findChild('.drop-down__icon') as HTMLElement
		if (trigger) {
			trigger.addEventListener('click', function() {
				this.classList.toggle('open')
			})
		}

		const menuActivator: { [action: string]: { menuTitle: string, buttonValue: string } } = {
			addUser: {
				menuTitle: 'Добавить пользователя',
				buttonValue: 'Добавить'
			},
			removeUser: {
				menuTitle: 'Удалить пользователя',
				buttonValue: 'Удалить'
			},
			deleteChat: {
				menuTitle: 'Удалить чат с пользователем',
				buttonValue: 'Удалить'
			}
		}

		const actiontriggers = this.findChildren('li[data-action]')
		if (actiontriggers !== null) {
			actiontriggers.forEach(actionTrigger => {
				actionTrigger.addEventListener('click', () => {
					const action = actionTrigger.dataset.action
					const availableActions = Object.keys(menuActivator)
					if (!action || !availableActions.includes(action)) {
						return true
					}

					const title = menuActivator[action].menuTitle
					const buttonValue = menuActivator[action].buttonValue

					popup.setProps({ action, title, buttonValue })
					popup.show()

					if (trigger) {
						trigger.classList.remove('open')
					}
				})
			})
		}
	}
}

export const MainContentHeader = new DropMenu('.main-content__participant')