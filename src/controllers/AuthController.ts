import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import store from '../utils/Store'
import router from '../utils/Router'
import MessagesController from './MessagesController'

class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = new AuthAPI()
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data)

      await this.fetchUser()

      router.go('/profile')
    } catch (e: any) {
      console.error(e)
    }
  }

  async signup(data: SignupData) {
    console.log(this)
    try {
      await this.api.signup(data)

      await this.fetchUser()

      router.go('/profile')
    } catch (e: any) {
      console.error(e.message)
    }
  }

  async fetchUser() {
    const user = await this.api.read()
    console.log('fetchUse====>', user)
    store.set('user', user)
  }

  async logout() {
    try {
      MessagesController.closeAll()

      await this.api.logout()

      router.go('/')
    } catch (e: any) {
      console.error(e.message)
    }
  }
}

const controller = new AuthController()

// @ts-ignore
window.authController = controller

export default controller
