type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed): string | never {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((res, key, index) => {
        const value = data[key];
        const endLine = index < keys.length - 1 ? '&' : '';

        if (Array.isArray(value)) {
            const arrayValue = value.reduce<StringIndexed>(
                (result, arrData, i) => ({
                    ...result,
                    [`${key}[${i}]`]: arrData,
                }),
                {},
            );

            return `${res}${queryStringify(arrayValue)}${endLine}`;
        }

        if (typeof value === 'object') {
            const objValue = Object.keys(value || {}).reduce<StringIndexed>(
                (result, objKey) => ({
                    ...result,
                    [`${key}[${objKey}]`]: value[objKey],
                }),
                {},
            );

            return `${res}${queryStringify(objValue)}${endLine}`;
        }

        return `${res}${key}=${value}${endLine}`;
    }, '');
}

export default queryStringify;
