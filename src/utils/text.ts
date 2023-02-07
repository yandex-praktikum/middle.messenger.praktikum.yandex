// eslint-disable-next-line import/prefer-default-export
export const sliceLastMessage = (msg: string = '', type: string = 'in'): string => {
    let sliceMsg = '';
    if (type === 'out') sliceMsg = `<span>Вы:</span> ${msg}`;
    if (sliceMsg.length > 58) return `${sliceMsg.substr(0, 55)}...`;
    return sliceMsg;
};
