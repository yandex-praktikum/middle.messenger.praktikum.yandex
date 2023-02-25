// eslint-disable-next-line import/prefer-default-export
export const sliceLastMessage = (msg: string = '', out?: boolean): string => {
    console.log(msg);

    let sliceMsg = '';
    sliceMsg = out ? `<span>Вы:</span> ${msg}` : msg;
    if (sliceMsg.length > 58) return `${sliceMsg.substr(0, 55)}...`;
    return sliceMsg;
};
