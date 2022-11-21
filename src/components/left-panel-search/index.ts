import Block from '../../utils/block'
import { findContacts } from '../left-panel-item'

class SearchLineComponent extends Block {
    init(): void {
        const inputField = this.findChild('input[type="search"]') as HTMLInputElement
        if (inputField) {
            inputField.addEventListener('change', () => {
                inputField.classList.toggle('with-text', inputField.value.length > 0)
            })

            inputField.addEventListener('input', findContacts)
        }
    }
}

export const LeftPanelSearch = new SearchLineComponent('.search-line__chat')