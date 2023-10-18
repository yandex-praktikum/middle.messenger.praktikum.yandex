import { Block, Store, StoreEvents } from "../../core/index";
import template from "./ChatsAndChat.tmp.pug";
import {
  FieldText,
  Avatar,
  Title,
  UserInformation,
  Link,
  Spinner,
  Chats,
  Chat,
  Layout,
  CreateChatForm,
  Button,
  ChatArea,
  ChatInformation,
  Modal,
  UploadAvatarForm,
  AddUserForm,
  DeleteUserForm,
  Message,
  Conversation,
} from "../../components/index";
import { AuthController, ChatsController, UsersController } from "../../controllers";

const createChatForm = new CreateChatForm({
  chatName: new FieldText({
    withId: true,
    type: 'text',
    name: 'title',
    placeholder: 'Enter chat name',
  }),
  createBtn: new Button({
    withId: true,
    className: 'btn btn--w-100',
    text: 'Create chat',
  }),
  errorText: '',
});

const fieldSearch = new FieldText({
  mods: 'field-text--center field-text--white',
  type: 'text',
  name: 'search',
  value: '',
  placeholder: 'search',
})

const chatsArea = new Chats({
  withId: true,
  chats: [new Spinner()],
})

const userInformation = new UserInformation({
  userAvatar: new Avatar(),
  userName: new Title({
    tag: 'h6',
    className: 'name',
    text: '',
  }),
  userProfileLink: new Link({
    className: 'name',
    href: '/settings',
    text: 'Settings',
  }),
});

const chatArea = new Layout({
  withId: true,
  content: '<p class="t-center color-l-grey" style="transform: translateY(50vh)">Select chat</p>',
})

const modal = new Modal({
  title: 'My modal',
  content: '<p>Modal content</p>',
})

export default class ChatsAndChat extends Block {
  constructor(props?: object) {
    super('div', {
      ...props,
      createChatForm,
      fieldSearch,
      chatsArea,
      userInformation,
      chatArea,
      modal,
    });

    ChatsController.request();
    AuthController.getUserInfo();

    Store
      .on(StoreEvents.UserUpdate, () => {
        const { user: { avatar, first_name } } = Store.getState();
        const { userAvatar, userName } = this.children.userInformation.children;

        if (avatar) {
          userAvatar.setProps({
            src: avatar,
            alt: `${first_name} avatar`,
          })
        }

        userName.setProps({
          text: first_name,
        })
      })
      .on(StoreEvents.ChatsUpdate, () => {
        const { chats, selectedChat } = Store.getState();
        const { chatsArea, chatArea } = this.children;

        if (chats.length > 0) {
          chatsArea.children['chats'] = chats.map((
            {
              id,
              avatar,
              title,
              last_message,
            },
          ) => {
            return new Chat({
              id,
              withId: true,
              chatAvatar: new Avatar({
                src: avatar,
                alt: `Avatar of the chat ${title}`,
              }),
              chatName: title,
              lastMessage: last_message || null,
            })
          });
          chatsArea._render();

          if (selectedChat) {
            const { chatInfo } = chatArea.children['content'].children;
            const { chatAvatar } = chatInfo.children;

            for (const chat of chats) {
              if (chat.id === selectedChat) {
                chatAvatar.setProps({
                  src: chat.avatar,
                })
                break;
              }
            }
          }
        } else {
          chatsArea.children = [];
          chatsArea.setProps({
            chats: '<p class="t-center color-l-grey">Create your first chat!</p>',
          })
        }
      })
      .on(StoreEvents.ChatsSelected, async () => {
        const { chatArea, modal } = this.children;
        const {
          user,
          chats,
          selectedChat: selectedChatId,
          messages,
        } = Store.getState();

        if (!selectedChatId) {
          chatArea.children = [];
          chatArea.setProps({
            content: `
              <p class="t-center color-l-grey" style="transform: translateY(50vh)">Select chat</p>
            `,
          })

          return;
        }

        const {
          id,
          avatar,
          title,
        } = chats.find((chat) => chat.id === selectedChatId);

        id as number;

        const wsBaseURL = 'wss://ya-praktikum.tech/ws/chats/';
        const response = await ChatsController.getToken(id);
        const { token } = response;

        const socket = new WebSocket(`${wsBaseURL}${user.id}/${id}/${token}`);

        socket.addEventListener('open', () => {
          console.log('Соединение установлено');

          socket.send(JSON.stringify({
            type: 'get old',
            content: '0',
          }))

          setInterval(() => {
            socket.send(JSON.stringify({
              type: 'ping',
            }))
          }, 30000)
        });

        socket.addEventListener('close', (event) => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }

          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', async (event) => {
          let result = null;
          try {
            result = JSON.parse(event.data);
          } catch (error) {
            console.error(error);
          }

          if (result.type === 'pong') {
            return;
          }

          if (Array.isArray(result)) {
            Store.set('messages', result.reverse());

            return;
          }

          const { content, time, user_id } = result;
          const { chats, selectedChat: selectedChatId, messages } = Store.getState();

          const userInfo = await UsersController.request(user_id);

          const updatedChats = chats.map((item) => {
            if (item.id === selectedChatId) {
              item.last_message = {
                content,
                time,
                user: userInfo,
              }
            }

            return item;
          });

          messages.push(result);

          Store.set('chats', updatedChats);
          Store.set('messages', messages);
        });

        socket.addEventListener('error', (event: any) => {
          console.log('Ошибка', event.message);
        });

        chatArea.children['content'] = new ChatArea({
          chatInfo: new ChatInformation({
            chatAvatar: new Avatar({
              src: avatar,
              alt: `avatar ${title}`,
            }),
            chatName: title,
            chatButtons: [
              new Button({
                className: 'btn btn--w-100',
                type: 'button',
                text: 'Change avatar',
                attributes: { 'data-modal': 'open' },
                events: new Map([
                  ['click', () => {
                    modal.children['content'] = new UploadAvatarForm({
                      chatId: id,
                      sendBtn: new Button({
                        className: 'btn btn--w-100',
                        text: 'Send',
                      }),
                    });
                    modal.setProps({
                      title: 'Change chat avatar',
                      content: '',
                    })
                    modal.show();
                  }],
                ]),
              }),
              new Button({
                className: 'btn btn--w-100',
                type: 'button',
                text: 'Add user',
                attributes: { 'data-modal': 'open' },
                events: new Map([
                  ['click', () => {
                    modal.children['content'] = new AddUserForm({
                      chatId: id,
                      fieldChatId: new FieldText({
                        name: 'chatId',
                        value: id,
                        attributes: { hidden: '' },
                      }),
                      fieldAddUser: new FieldText({
                        type: 'text',
                        name: 'login',
                        placeholder: 'Enter the user\'s login',
                        helpText: `
                          от 3 до 20 символов, латиница, может содержать цифры,
                          но не состоять из них, без пробелов, без спецсимволов
                          (допустимы дефис и нижнее подчёркивание)
                        `,
                        pattern: '(?=^.{3,20}$)[a-zA-Z_-]+[0-9_-a-zA-Z]*',
                      }),
                      sendBtn: new Button({
                        className: 'btn btn--w-100',
                        text: 'Send',
                      }),
                    });
                    modal.setProps({
                      title: 'Add user in chat',
                      content: '',
                    })
                    modal.show();
                  }],
                ]),
              }),
              new Button({
                className: 'btn btn--w-100 btn--red',
                type: 'button',
                text: 'Delete user',
                attributes: { 'data-modal': 'open' },
                events: new Map([
                  ['click', () => {
                    modal.children['content'] = new DeleteUserForm({
                      chatId: id,
                      fieldChatId: new FieldText({
                        name: 'chatId',
                        value: id,
                        attributes: { hidden: '' },
                      }),
                      fieldDeleteUser: new FieldText({
                        type: 'text',
                        name: 'login',
                        placeholder: 'Enter the user\'s login',
                        helpText: `
                          от 3 до 20 символов, латиница, может содержать цифры,
                          но не состоять из них, без пробелов, без спецсимволов
                          (допустимы дефис и нижнее подчёркивание)
                        `,
                        pattern: '(?=^.{3,20}$)[a-zA-Z_-]+[0-9_-a-zA-Z]*',
                      }),
                      sendBtn: new Button({
                        className: 'btn btn--w-100',
                        text: 'Send',
                      }),
                    });
                    modal.setProps({
                      title: 'Delete user from chat',
                      content: '',
                    })
                    modal.show();
                  }],
                ]),
              }),
              new Button({
                className: 'btn btn--w-100 btn--red',
                type: 'button',
                text: 'Delete chat',
                events: new Map([
                  ['click', () => {
                    ChatsController.delete({ chatId: id })
                  }],
                ]),
              }),
            ],
          }),
          conversation: new Conversation({
            content: messages.map(({ user_id, time, content }) => {
              return new Message({
                user_id,
                time,
                content,
                active_user_id: user.id,
                append: false,
              })
            }),
          }),
          fieldMessage: new FieldText({
            mods: 'field-text--main',
            type: 'text',
            name: 'message',
            value: '',
            placeholder: 'Type a message, press Enter to send the message',
            pattern: '[\\S\\s]+[\\S]+',
            events: new Map([
              ['keydown', (event: any) => {
                const { target, key } = event

                const value = target.value.trim();
                if (key !== 'Enter' || value.length === 0) return;

                socket.send(JSON.stringify({
                  type: 'message',
                  content: value,
                }));

                target.value = '';
              }],
            ]),
          }),
        })

        chatArea._render();
      })
      .on(StoreEvents.ChatsMessage, () => {
        const { chatArea } = this.children;
        const { conversation } = chatArea.children.content.children;
        const { messages, user } = Store.getState();

        conversation.children['content'] = messages.map(({ user_id, time, content }) => {
          return new Message({
            user_id,
            time,
            content,
            active_user_id: user.id,
            append: false,
          })
        })

        conversation._render();
      })
  }

  render() {
    return this.compile(template, this.props);
  }
}
