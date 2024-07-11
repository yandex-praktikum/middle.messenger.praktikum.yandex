export const chatData = {
    title: 'Chat',
    chatContacts: new Array(25).fill(),
    messages: [
        ...Array(12).fill({class: 'dialog__message'}),
        ...Array(8).fill({class: 'dialog__message dialog__message_mine'}),
    ].sort(() => Math.random() - 0.5)
}
