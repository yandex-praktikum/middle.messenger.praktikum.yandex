import { ProfileLayout } from "../../layouts";
import { ProfileInfo } from "../../modules";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ChangeProfile()

export function ChangeProfile() {
    return (
        `
        <main>
            ${ProfileLayout(ProfileInfo({ isChange: true }))}
        </main>
        `
    );
}
