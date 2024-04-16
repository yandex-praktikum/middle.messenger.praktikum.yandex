export type User = {
  id: number
  avatar: string
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

export type Chat = {
  id: number
  title: string
  avatar: string | null
  unread_count: number
  created_by: number
  last_message: {
    content: string
    id: number
    time: string
    user: User
  }
}

export type Message = {
  chat_id: number
  content: string
  file: null
  id: number
  is_read: boolean
  time: string
  type: "message"
  user_id: number
}

export type EditPasswordData = {
  oldPassword: string
  newPassword: string
}
