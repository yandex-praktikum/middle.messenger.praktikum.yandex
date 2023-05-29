export const sliceLastMessage = (msg = '', type = 'in') => {
    if (type === 'out') msg = '<span>Вы:</span> ' + msg;
    if (msg.length > 58) return msg.substr(0, 55) + '...';
    return msg;
}
