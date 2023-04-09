import * as cls from './clientError.module.scss'
import clientErrorTpl from './clientError.hbs'

const data = {
  title: "404",
  description: "Не туда попали",
  link: "Назад к чатам",
  class: cls
}

const ClientError = () => clientErrorTpl(data)

export default ClientError
