import { Button, Input, Link } from '../../components'
import { FormLayout } from '../../layouts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = Registration()

export function Registration() {
    return (
        `
        <main>
            ${FormLayout({
            title: 'Регистрация',
            inputs: `
                ${Input({ title: 'Почта', type: 'email', name: 'email' })}
                ${Input({ title: 'Логин', type: 'text', name: 'login' })}

                ${Input({ title: 'Имя', type: 'text', name: 'first_name' })}
                ${Input({ title: 'Фамилия', type: 'text', name: 'second_name' })}
                ${Input({ title: 'Телефон', type: 'tel', name: 'phone' })}
                ${Input({ title: 'Пароль', type: 'password', name: 'password' })}
                ${Input({ title: 'Пароль (ещё раз)', type: 'password', name: 'password' })}
            `,
            button: `${Button({ text: 'Зарегистрироваться' })}`,
            link: `${Link({ text: 'Войти?', href: '/' })}`
        })}
        </main>
        `
    )
}
