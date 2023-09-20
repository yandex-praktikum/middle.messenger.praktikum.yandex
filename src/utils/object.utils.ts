export const isDeepEqual=<T extends object>(object1:{[index: string]:T}, object2:{[index: string]:T}) => {

    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);

    if (objKeys1.length !== objKeys2.length) return false;

    for (const key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        const isObjects = isObject(value1) && isObject(value2);

        if ((isObjects && !isDeepEqual(value1 as { [index: string]: T } , value2 as { [index: string]: T })) ||
            (!isObjects && value1 !== value2)
        ) {
            return false;
        }
    }
    return true;
};

const isObject = (object:object) => {
    return object != null && typeof object === "object";
};
