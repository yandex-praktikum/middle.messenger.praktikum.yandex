// eslint-disable-next-line import/prefer-default-export
export const sliceLastMessage = (msg: string = '', type: string = 'in'): string => {
    let sliceMsg = '';
    sliceMsg = type === 'out' ? `<span>Вы:</span> ${msg}` : msg;
    if (sliceMsg.length > 58) return `${sliceMsg.substr(0, 55)}...`;
    return sliceMsg;
};
