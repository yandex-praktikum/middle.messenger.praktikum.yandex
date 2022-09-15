
const initChatItem = () => {
  const chatItems = document.querySelectorAll('.chat-item');

  const enableActiveChat = (evt) => {
    const target = evt.target.closest('.chat-item');
    chatItems.forEach((chat) => {
      chat.classList.remove('is-active');
      target.classList.add('is-active');
    });
  };

  chatItems.forEach((chat) => {
    chat.addEventListener('click', enableActiveChat);
  });

};

export {initChatItem};
