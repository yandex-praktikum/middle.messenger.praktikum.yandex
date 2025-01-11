# Проект: Мессенджер

## Описание проекта

Мессенджер с возможностью авторизации, регистрации, отправки чатов и просмотра/редактирования профиля

## Навигация по страницам

В проекте используется кастомная маршрутизация с помощью событий, ниже приведен список доступных ссылок. Для перехода на страницу, нужно выполнить скрипт в консоли разработчика

### Список маршрутов

| Ссылка | Описание | Скрипт для перехода на страницу                                    |
|------------|-----------------------|-------------------------------------------------------------------|
| `/signin`   | Страница авторизации        | `window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'redirectSignIn' } }));`   |
| `/signup`  | Страница регистрации  | `window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'redirectSignUp' } }));`  |
| `/profile` | Профили  | `window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'profile' } }));` |
| `/chats`    | Чаты                   | `window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'chats' } }));`    |
| `/notFound500`    | Страница не найдена                   | `window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'notFound500' } }));`    |
| `/notFound404`    | Ошибка на стороне сервера                   | `window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'notFound404' } }));`    |

## Команды для запуска

- `npm run dev` — запуск проекта (режим разработки),
- `npm run build` — сборка актуальной версии проекта,
- `npm run start` - сборка и запуск проекта,
- `npm run serve` — запуск локальной сборки ,

## Ссылки

- [GitHub](https://github.com/nikitayakovina/middle.messenger.praktikum.yandex)
- [Figma](https://www.figma.com/design/ZPiFnVRrOhu9OxRZqZXZGh/Sprint_1?node-id=0-1&p=f&t=S8laBn2WVgdTwr92-0)
- [Netlify](https://roaring-hotteok-9aed2c.netlify.app/)

