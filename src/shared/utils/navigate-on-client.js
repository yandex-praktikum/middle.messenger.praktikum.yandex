import Handlebars from 'handlebars';

export function navigateOnClient(pages, page) {
    if (page) {
        const [source, context] = pages[page];
        const app = document.getElementById('app');
        app.innerHTML = Handlebars.compile(source)(context);
    }
}
