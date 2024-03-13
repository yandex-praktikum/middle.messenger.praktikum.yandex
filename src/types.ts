export type Partial = { name: string; template: string }

export type Userdata = {
  username: string
  email: string
  login: string
  firstName: string
  lastName: string
  displayName: string
  phone: string
}

export type ProfilePageContext = {
  editInfo: boolean
  editPassword: boolean
  userdata: Userdata
}

export type ErrorPageContext = {
  errorCode: string
  errorText: string
}
