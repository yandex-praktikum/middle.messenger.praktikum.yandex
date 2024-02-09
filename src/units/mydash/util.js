function identity(value) {
    return value;
}

function rangeRight(start, end, step) {
    return range(start, end, step, true);
}

function range(start, end, step, isRight) {
    let newArr = [];
    if(start !== undefined && end === undefined && step === undefined) {
        if(start < 0) {
            for (let p = 0; p > start; p--) {
                newArr.push(p);
            }
        }   else {
            for (let p = 0; p < start; p++) {
                newArr.push(p);
            }
        }

        return isRight ? newArr.reverse() : newArr;
    }   else if(start !== undefined && end !== undefined && step === undefined) {
        for (let p = start; p < end; p++) {
            newArr.push(p);
        }
        return isRight ? newArr.reverse() : newArr;
    }      else if(start !== undefined && end !== undefined && step !== undefined) {
        for (let p = start; p < end; p+=step) {
            newArr.push(p);
        }
        return isRight ? newArr.reverse() : newArr;
    }   else {
        return [];
    }
}


function last(arr) {
    if(arr.length > 0)
        return arr[arr.length - 1];

    return undefined;
}

function first(arr) {
    if(arr.length > 0)
        return arr[0];

    return undefined;
}

function isEmpty(value) {
    if(value !== undefined && value !== null) {
        if(Array.isArray(value)) {
            return false;
        }   else  if(typeof value === "object" && Object.keys(value).length > 0) {
            return false;
        }   else  if(typeof value === "string" && value !== "") {
            return false;
        }  else  if((value.constructor === Map || value.constructor === Set) && value.size > 0) {
            return false;
        }
    }

    return true;
}



console.log(isEmpty(null)); // => true
console.log(isEmpty(true)); // => true
console.log(isEmpty(1)); // => true
console.log(isEmpty([1, 2, 3])); // => false
console.log(isEmpty({ 'a': 1 })); // => false
console.log(isEmpty('123')); // => false
console.log(isEmpty(123)); // => true
console.log(isEmpty('')); // => true
console.log(isEmpty(0)); // => true
console.log(isEmpty(undefined)); // => true
console.log(isEmpty(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']]))); // => false
console.log(isEmpty(new Set(['value1', 'value2', 'value3']))); // => false
