import Handlebars from 'handlebars';
import './list-cats.css';

export {default as ListCats} from './list-cats.hbs?raw';


Handlebars.registerHelper('cats', ()=>{
    return [{name: 'cat 1'}, {name: 'cat 2'},
            {name: 'cat 3'}, {name: 'cat 4'}
    ]
})