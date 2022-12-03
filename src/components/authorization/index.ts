import Block from '../../utils/block'
import InputFormValidator from '../../utils/validation/authorization-validator'

class Input extends Block {
    init() {
        const form = this.findChild('form')
        if (form) {
            try {
                const validator: InputFormValidator = new InputFormValidator(form)
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

const input = new Input('.authorization')
input.mountTo('body')