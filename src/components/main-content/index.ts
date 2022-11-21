import { MainContent } from '../main-content-wrapper/index'
import { MainContentHeader } from '../main-content-header/index'
import { ChatMessages } from '../main-content-message/index'
import { MainContentInput } from '../main-content-input/index'
import { popup } from '../popup/index'

MainContent.mountTo('main')
MainContentHeader.mountTo(MainContent)
ChatMessages.mountTo(MainContent)
MainContentInput.mountTo(MainContent)
popup.mountTo('.left-panel')