export const sliceLastMessage = (msg: string = '', type: string = 'in'): string => {
    if (type === 'out') msg = '<span>Вы:</span> ' + msg;
    if (msg.length > 58) return msg.substr(0, 55) + '...';
    return msg;
}
