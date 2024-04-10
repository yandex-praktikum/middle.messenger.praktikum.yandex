import { AuthService, LoginData, RegisterData } from '@/services/AuthService.ts'
import store from '@/core/Store.ts'

const authService = new AuthService()

export class AuthController {
  public async signin(data: LoginData) {
    try {
      return await authService.signin({
        login: data.login,
        password: data.password,
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }

  public async signup(data: RegisterData) {
    return authService
      .signup({
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        password: data.password,
        phone: data.phone,
      })
      .then((resp) => {
        if (resp.status === 200) {
          store.set('user', { id: resp.response })
        }
        return resp
      })
      .catch((error) => {
        return error
      })
  }

  public async getUser() {
    return authService.getUser().then((resp) => {
      if (resp.status === 200) {
        const data = JSON.parse(resp.response)
        data.avatar = data.avatar.replaceAll('/', '%2F')
        data.avatar = `https://ya-praktikum.tech/api/v2/resources/${data.avatar}`
        store.set('userdata', data)
      }
      return resp
    }).catch((error) => {
      return error
    })
  }
}
