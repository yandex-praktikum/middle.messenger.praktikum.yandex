import { Routes } from '../../index'
import { Input } from '../components/Input/input'

type btnAwesomeProps = {
  url: Routes
  message?: string
  action?: () => void
}

export const redirect = ({ url, action = undefined }: btnAwesomeProps) => {
  console.log(url)
  if (url) window.location.href = url
  if (action) action()
  // alert('No such route')
  // const values = Object.values(this.children)
  //   .filter((child) => child instanceof Input)
  //   .map((child) => [(child as Input).getName(), (child as Input).getValue()])

  // const data = Object.fromEntries(values)

  // AuthController.signin(data as SignupData)
}

export const log = (message: string) => console.log(message)

export const findIndexByKeyValue = (arr: any[], key: string, value: any) => {
  return arr.findIndex((obj) => obj[key] === value)
}

export const parseDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`
  return formattedDate
}

export const setStyles = (el: HTMLElement, attrs: Record<string, string>) => {
  const style = Object.entries(attrs)
    .map((a) => `${a[0]}: ${a[1]};`)
    .join(' ')
  el.setAttribute('style', style)
}

export const validateInput = (inp: Input) => {
  const regex = inp.getProps('regex')
  const value = inp.getValue()
  return {
    name: inp.getName(),
    valid: regex.test(value),
    value: inp.getValue(),
    warning: inp.getProps('warning'),
  }
}
