import Block from '../classes/Block';

export function isEqual(lhs, rhs): boolean {
    return lhs === rhs;
}

export function render(query: string, block: Block): void {
    const root = document.querySelector(query);
    if (root) {
        root.innerHTML = '';
        // eslint-disable-next-line new-cap
        root.append(block.getContent());
    }
};


type Indexed<T = any> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    // eslint-disable-next-line no-restricted-syntax
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }
    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}

export function searchObjInArray(array: Array<Record<string, string | number>>, key: string, value: string) {
    
    console.log(array[0].last_message.content);
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item[key] === value) {
            
            return { ...item };
        }
    }
    return undefined;
}