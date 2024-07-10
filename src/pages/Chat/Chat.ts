import { ChatLayout } from "../../layouts"
import { ChatView } from "../../modules"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = Chat()

export function Chat() {
    return (
        `
        ${ChatLayout(ChatView())}
        `
    )
}