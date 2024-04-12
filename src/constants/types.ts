export type User = {
  id: number
  avatar: string
  email: string
  login: string
  firstName: string
  secondName: string
  displayName: string
  phone: string
}

export type Chat = {
  id: number
  title: string
  avatar: string
  unread_count: number
  created_by: number
  last_message: {
    user: User
  }
  time: Date
  content: string
}

export type EditPasswordData = {
  oldPassword: string
  newPassword: string
}
