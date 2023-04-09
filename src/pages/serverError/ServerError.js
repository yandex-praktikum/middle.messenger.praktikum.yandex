import * as cls from './serverError.module.scss'
import serverErrorTpl from './serverError.hbs'

const data = {
  title: "500",
  description: "Мы уже фиксим",
  link: "Назад к чатам",
  class: cls
}
const ServerError = () => serverErrorTpl(data)

export default ServerError
