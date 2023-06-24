import { Routes } from '../../index'

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

export const log = ({ message }: btnAwesomeProps) => {
  console.log(message)
}
