import { ErrorLayout } from "../../layouts"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ServerError()

export function ServerError() {
    return (
        `
        ${ErrorLayout({
            title: '500',
            text: 'Мы уже фиксим'
        })}
        `
    )
}