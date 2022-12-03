import Block from '../../utils/block'
import InputValidator from '../../utils/validation/registration-validator'

class Input extends Block {
    init() {
        const form = this.findChild('form')
        if (form) {
            try {
                const validator: InputValidator = new InputValidator(form)
                form.addEventListener('submit', ev => {
                    ev.preventDefault()
                    if (!validator.validateFormFields()) {
                        return false
                    }
                    console.log('Запрос отправлен')
                })
            }
            catch (exception) {
                console.error(`Запрос не отправлен: ${exception}`)
            }
        }
    }
}

const input = new Input('.registration')
input.mountTo('body')