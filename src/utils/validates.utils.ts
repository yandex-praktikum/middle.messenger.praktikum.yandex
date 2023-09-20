/**
 * от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
 * @param value
 */
export const validateLogin = (value: string) => {
    if (value.length === 0) return `Login can not be blank`;
    if (value.length < 3) {
        return 'Login must have minimum 3 characters'
    }
    if (value.length > 20) {
        return 'Login must have maximum 20 characters'
    }
    if (!value.match(/(?=.*[a-z])/)) {
        return 'Login must have letters'
    }
    if (!value.match(/^[a-z0-9_-]{3,}$/)) {
        return 'Login must be a single word and can include latin characters in lower case, numerals, dash and underscore'
    }
    return '';
}


/**
 * от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
 * @param value
 */
export const validatePassword = (value: string) => {
    if (value.length === 0) return `Password can not be blank`;
    if (value.length < 8) {
        return 'Password must have minimum 8 characters'
    }
    if (value.length > 40) {
        return 'Password must have maximum 40 characters'
    }
    if (!value.match(/(?=.*[A-Z])/)) {
        return 'Password must have uppercase letters'
    }
    if (!value.match(/(?=.*[a-z])/)) {
        return 'Password must have lower letters'
    }
    if (!value.match(/(?=.*[0-9])/)) {
        return 'Password must have number'
    }
    return '';
}

/**
 first_name, second_name — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
 */
export const validateName = (value: string) => {
    if (value.length === 0) return `Name can not be blank`;
    if (value.length < 2) {
        return 'Name must have minimum 2 characters'
    }
    if (value.length > 140) {
        return 'Name must have maximum 140 characters'
    }
    if (!value.match(/^[A-Z]+/)) {
        return 'Name must have first uppercase letter'
    }
    if (!value.match(/[a-z-]$/)) {
        return 'Name must have only letters and dash'
    }
    return '';
}

/**
 * email — латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.//  /^\S+@\S+\.\S+$/
 */
export const validateEmail = (value: string) => {
    if (value.length === 0) return `Email can not be blank`;

    if (!value.match(/^\S+@\S+\.\S+$/)) {
        return 'Invalid email'
    }
    return '';
}

/**
 * phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.
 */

export const validatePhone = (value: string) => {
    if (value.length === 0) return `Phone can not be blank`;

    if (!value.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/)) {
        return 'Invalid Phone, example +123-456-789-1234'
    }
    return '';
}
/**
 * message — не должно быть пустым.
 */
export const validateMessage = (value: string) => {
    if (value.length === 0) return `Message can not be blank`;
    return '';
}
