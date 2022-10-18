import "./errors.styl"
import error404hbs from "./404.hbs"
import error500hbs from "./500.hbs"

export const error404=()=>{
    document.body.innerHTML=error404hbs()
}

export const error500=()=>{
    document.body.innerHTML=error500hbs()
}