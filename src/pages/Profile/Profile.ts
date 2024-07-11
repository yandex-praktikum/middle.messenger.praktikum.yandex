import { ProfileLayout } from "../../layouts";
import { ProfileInfo } from "../../modules";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = Profile()

export function Profile() {
    return (
        `
        <main>
            ${ProfileLayout(ProfileInfo({ isChange: false }))}
        </main>
        `
    );
}
