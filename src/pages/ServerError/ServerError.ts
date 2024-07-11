import { ErrorLayout } from "../../layouts"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ServerError()

export function ServerError() {
    return (
        `
        <main>
        ${ErrorLayout({
            title: '500',
            text: 'Мы уже фиксим'
        })}
        </main>
        `
    )
}
