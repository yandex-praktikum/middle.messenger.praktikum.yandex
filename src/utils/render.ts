// import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import SignUp from '../pages/SignUp'
import Profile from '../pages/Profile'
import ChatPage from '../pages/ChatPage'
import Settings from '../pages/Settings'
import PasswordChange from '../pages/PasswordChange'
import Home from '../pages/Home'

const ROUTES = {
	home: Home,
	login: LoginPage,
	signup: SignUp,
	profile: Profile,
	chat: ChatPage,
	settings: Settings,
	password: PasswordChange,
}

export function render(name: keyof typeof ROUTES) {
	const root = document.querySelector('#app')!

	root.innerHTML = ''

	const Page = ROUTES[name]

	const page = new Page()

	root.append(page.getContent()!)

	page.dispatchComponentDidMount()
}
