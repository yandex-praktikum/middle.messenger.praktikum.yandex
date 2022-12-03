import Block from '../../utils/block'
import { LeftPanelChats } from '../left-panel-chats/index'

const chats = [
    {
        time: "10:49",
        author: "Андрей",
        message: "Изображение",
        unreadCount: 2
    },
    {
        time: "12:00",
        author: "Киноклуб",
        message: "Вы: стикер",
        unreadCount: 0
    },
    {
        time: "15:12",
        author: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!...",
        unreadCount: 4
    },
    {
        time: "Пт",
        author: "Вадим",
        message: "Вы: Круто!",
        unreadCount: 0
    },
    {
        time: "Ср",
        author: "тет-а-теты",
        message: "И Human Interface Guidelines и Material Design рекомендуют...",
        unreadCount: 0
    },
    {
        time: "Пн",
        author: "1, 2, 3",
        message: "Канал от  NTI-systems по обучению рекомендует...",
        unreadCount: 0
    },
    {
        time: "Пн",
        author: "Андрей",
        message: "Изображение",
        unreadCount: 0
    },
    {
        time: "Пн",
        author: "Киноклуб",
        message: "Вы: стикер",
        unreadCount: 0
    },
    {
        time: "Пт",
        author: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!...",
        unreadCount: 4
    },
    {
        time: "Пт",
        author: "Вадим",
        message: "Вы: Круто!",
        unreadCount: 0
    },
    {
        time: "Ср",
        author: "тет-а-теты",
        message: "И Human Interface Guidelines и Material Design рекомендуют...",
        unreadCount: 0
    },
    {
        time: "Пн",
        author: "1, 2, 3",
        message: "Канал от  NTI-systems по обучению рекомендует...",
        unreadCount: 1
    }
]

const LeftPanelResults = new Block('.left-panel__results')

class LeftPanelChatItem extends Block {
    render(): void {
        const unreadCount = this.props.getProperty('unreadCount')
        const chatEl = this.findChild('.chat')
        if (chatEl && unreadCount !== null) {
            chatEl.classList.add(`unread-${unreadCount}`)
        }

        const unreadCounter = this.findChild('.chat__unread-count')
        if (unreadCounter && unreadCount !== null && unreadCount == 0) {
            unreadCounter.classList.add('hidden')
        }
    }

    init(): void {
        this.element.addEventListener('click', clickHandler.bind(this))
    }
}

function clickHandler(this: Block) {
    console.info('Клик по элементу в списке чатов', this)
}

chats.forEach(chat => {
    const element = new LeftPanelChatItem('.left-panel__item', chat, LeftPanelChats)
    element.bindPropsToElements({
        time: 'time.chat__time',
        author: '.chat__author',
        message: '.chat__message',
        unreadCount: '.chat__unread-count'
    })
})

function findContacts(this: HTMLInputElement) {
    
    const searchText: string = this.value.toLocaleLowerCase()

    LeftPanelResults.clear()
    LeftPanelResults.element.classList.remove('visible')

    if (!searchText.length) {
        LeftPanelResults.element.classList.remove('visible')
        return false
    }
    LeftPanelResults.element.classList.add('visible')

    class LeftPanelChatSearch extends Block {
        render(): void {
            const unreadCount = this.props.getProperty('unreadCount')
            const chatEl = this.findChild('.search-result')
            if (chatEl && unreadCount !== null) {
                chatEl.classList.add(`unread-${unreadCount}`)
            }
    
            const unreadCounter = this.findChild('.search-result__unread-count')
            if (unreadCounter && unreadCount !== null && unreadCount == 0) {
                unreadCounter.classList.add('hidden')
            }
        }
    
        init(): void {
            this.element.addEventListener('click', clickHandler.bind(this))
        }
    }

    const found = chats.filter(chat => chat.author.toLocaleLowerCase().includes(searchText))

    found.forEach(chat => {
        const contactNode = new LeftPanelChatSearch('.left-panel__result', chat, LeftPanelResults)

        contactNode.bindPropsToElements({
            time: 'time.search-result__time',
            author: '.search-result__author',
            message: '.search-result__message',
            unreadCount: '.search-result__unread-count'
        })
    })
}

export { LeftPanelResults, findContacts }