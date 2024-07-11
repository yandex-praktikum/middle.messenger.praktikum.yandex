import { ChatLayout } from "../../layouts"
import s from './ChatSelect.module.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ChatSelect()

export function ChatSelect() {
    return (
        `
        <main>
            ${ChatLayout(
            `
                <div class=${s.select}>
                <p class=${s.select__text}>Выберите чат чтобы отправить сообщение</p>
                </div>
            `
        )}
        </main>
        `
    )
}
