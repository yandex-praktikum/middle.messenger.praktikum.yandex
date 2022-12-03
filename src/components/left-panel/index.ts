import { LeftPanelHeader } from '../left-panel-header/index'
import { LeftPanelResults } from '../left-panel-item/index'
import { LeftPanelSearch } from '../left-panel-search/index'
import { LeftPanelChats } from '../left-panel-chats/index'
import '../left-panel-item/index'

LeftPanelHeader.mountTo('.left-panel aside')
LeftPanelSearch.mountTo(LeftPanelHeader)
LeftPanelResults.mountTo('.left-panel aside')
LeftPanelChats.mountTo('.left-panel aside')
