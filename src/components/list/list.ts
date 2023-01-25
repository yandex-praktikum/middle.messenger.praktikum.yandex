import templateList from './list.hbs';
import templateLi from './li.hbs';
import './list.scss';

type TListArg = {
    id?: string,
    className?: string,
    items: string[]
}

export default function list({
    id = '', className = '', items = []
}: TListArg): string {
    let list = '';


    items.map(item => {
        list += templateLi({ content: item });
    })

    return templateList({ childrens: list });
}
