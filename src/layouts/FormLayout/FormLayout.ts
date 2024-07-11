import { Title } from '../../components';
import s from './FormLayout.module.scss'

export function FormLayout({ title, inputs, button, link }: { title: string, inputs: string, button: string, link: string }) {
    return (
        `
        <div class=${s.layout}>
            <div class=${s.layout__info}>
                ${Title({ text: title })}
                <form class=${s.layout__form}>
                    <div class=${s.layout__inputs}>
                        ${inputs}
                    </div>
                    <div class=${s.layout__buttons}>
                        ${button}
                        ${link}
                    </div>
                </form>
            </div>
        </div>
        `
    );
}
