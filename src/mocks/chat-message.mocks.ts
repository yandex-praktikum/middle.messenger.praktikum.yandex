import {ChatMessage} from "../models/chat-message";


export const message1: ChatMessage = {
    id: 123,
    user_id: 231,
    chat_id: 312,
    time: "2020-01-02",
    type: "file",
    content: 132,
    file: {
        id: 132,
        user_id: 231,
        path: `2.jpg`,
        filename: "file name",
        content_type: "image/jpeg",
        content_size: 543672,
        upload_date: "2020-01-02T14:22:22.000Z"
    }
}

export const message2: ChatMessage = {
    id: 123,
    user_id: 231,
    chat_id: 312,
    time: "2020-01-02",
    type: "text",
    content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
        '\n' +
        'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
}

export const message3: ChatMessage = {
    id: 123,
    user_id: 231,
    chat_id: 312,
    time: "2020-01-02",
    type: "file",
    content: 'Круто!!!',
    main: true,
}

export const mockListMessages = [message1, message2, message3];

