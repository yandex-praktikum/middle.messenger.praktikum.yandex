import { MessageItemProps } from '@/components/message/message.ts'
import { ChatController } from '@/controllers/ChatController.ts'
import store from '@/core/Store.ts'

const chatController = new ChatController()

export default async (userId: number, chatId: number) => {
  let token = ''

  await chatController.getToken(chatId).then((resp) => {
    token = resp.token
  })

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
  )

  socket.addEventListener('open', () => {
    console.log(`Соединение установлено c чатом ${chatId}`)

    if (socket) {
      socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      )
    }
  })

  const ping = setInterval(() => {
    socket?.send(JSON.stringify({ type: 'ping' }))
  }, 10000)

  socket.addEventListener('message', (event) => {
    try {
      const data: MessageItemProps = JSON.parse(event.data)

      if (Array.isArray(data)) {
        store.set('messages', data)
      }
      if (data.type === 'message') {
        const messages = store.getState().messages

        data.time = new Date().toISOString()

        store.set('messages', [data, ...messages])
      } else if (data.type === 'user connected') {
        const messages = store.getState().messages

        data.time = new Date().toISOString()
        data.content = `Юзер с id: ${data.content} присоединился к чату`

        store.set('messages', [data, ...messages])
      }
    } catch (error) {
      throw new Error('Невалидные данные сообщений')
    }
  })

  socket.addEventListener('close', () => {
    clearInterval(ping)
  })

  return socket
}
