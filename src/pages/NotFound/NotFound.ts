import { ErrorLayout } from "../../layouts"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ServerError()

export function ServerError() {
    return (
        `
        ${ErrorLayout({
            title: '404',
            text: 'Не туда попали'
        })}
        `
    )
}