import msgTemplate from './msg.hbs';
import mediaExample from '../../../../assets/img/example-media.jpg';


import './dialogWindow.scss';


export const dialogWindow = (messages = []) => {
    let currentGroupDate = '00.00.0000';
    let dialog = '';

    messages.forEach((item, i) => {
        if (currentGroupDate !== item.date) {
            currentGroupDate = item.date;
            dialog += `<div class="dialog__dategroup">${item.date}</div>`;
        }
        const media = item.media ? mediaExample : '';
        dialog += msgTemplate({...item,media} );
    });
    return ` <div class="dialog__window">${dialog}</div>`
}
