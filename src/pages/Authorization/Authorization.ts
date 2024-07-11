import { Button, Input, Link } from '../../components'
import { FormLayout } from '../../layouts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = Authorization()

export function Authorization() {
    return (
        `
        <main>
            ${FormLayout({
            title: 'Вход',
            inputs: `
                ${Input({ title: 'Логин', type: 'text', name: 'login' })}
                ${Input({ title: 'Пароль', type: 'password', name: 'password' })}
                `,
            button: `${Button({ text: 'Авторизоваться' })}`,
            link: `${Link({ text: 'Нет аккаунта?', href: '/registration' })}`
        })}
        </main>
        `
    )
}
