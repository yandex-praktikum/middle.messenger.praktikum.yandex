import {validateEmail, validateLogin, validateName, validatePassword, validatePhone} from "../utils/validates.utils.ts";

export interface IValidateType{
    login?: (value:string)=>string,
    password?: (value:string)=>string,
    password2?: (value:string)=>string,
    name?:(value:string)=>string,
    phone?:(value:string)=>string,
    email?:(value:string)=>string,

}

export const ALL_VALIDATE_FIELDS:IValidateType={
    login: validateLogin,
    name:validateName,
    phone:validatePhone,
    email:validateEmail,
    password:validatePassword
}
