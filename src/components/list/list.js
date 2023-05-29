import templateList from './list.hbs';
import templateLi from './li.hbs';
import './list.scss';


export default function list({
    id = '', className = '', items = []
})  {
    let list = '';

    items.map(item => {
        list += templateLi({ content: item });
    })

    return templateList({ childrens: list });
}
