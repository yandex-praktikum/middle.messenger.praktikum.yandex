import Handlebars from 'handlebars';
export { default as ChatingHistory } from './chatingHistory.hbs?raw';

Handlebars.registerHelper( 'chats-history', () => {
    return [
        { message: 'wkowivel kger gerg eirg eg eg oieroifer eoig eirg eg eoigj e',
            timeMessage: '02:12', img: '', authorI: true },
        { message: 'wkowivel kger gerg eirg eg eg oieroifer eoig esds d sdk skkmsd sd kmcwe wewemc we c wecmwkecomw ecwcirg eg eoigj e',
            timeMessage: '02:12', img: '', authorI: false },
        { message: 'wkow eoig eirg eg eoigj edsds sdsd ',
            timeMessage: '02:12', img: '../../../static/vite.svg', authorI: false },
        { message: 'wkow eoig eirg eg eoigj edsds sdsd ',
            timeMessage: '02:12', img: '../../../static/vite.svg', authorI: false },
        { message: 'wkow eoig eirg eg eoigj edsds sdsd ',
            timeMessage: '02:12', img: '../../../static/vite.svg', authorI: true },
        { message: 'wkow eoig eirg eg eoigj edsds sdsd ',
            timeMessage: '02:12', img: '../../../static/vite.svg', authorI: false },
        { message: 'wkow eoig eirg eg eoigj edsds sdsd ',
            timeMessage: '02:12', img: '../../../static/vite.svg', authorI: false },
    ]
});