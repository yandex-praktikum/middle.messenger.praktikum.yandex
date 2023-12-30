import { Button } from './components/Button'
import { registerComponent } from './utils/resgiterComponent'
import Card from './components/Card'
import { render } from './utils/render'
import Input from './components/Input'
import { Ref } from './components/Ref'
import InfoInput from './components/InfoInput'
import UserPhoto from './components/UserPhoto'
import DialogItem from './components/DialogItem'
import SentMessage from './components/SentMessage'
import ArrivedMessage from './components/ArrivedMessage'
import Sidebar from './components/Sidebar'

registerComponent('Button', Button)
registerComponent('Card', Card)
registerComponent('Input', Input)
registerComponent('Ref', Ref)
registerComponent('InfoInput', InfoInput)
registerComponent('UserPhoto', UserPhoto)
registerComponent('DialogItem', DialogItem)
registerComponent('Sidebar', Sidebar)
registerComponent('SentMessage', SentMessage)
registerComponent('ArrivedMessage', ArrivedMessage)

window.addEventListener('DOMContentLoaded', () => {
  render('home')
})
