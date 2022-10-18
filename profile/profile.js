import "./profile.styl"
import "./change_img.styl"
import profile from "./profile.hbs"
import change_img from "./change_img.hbs"

export default ()=>{
    document.body.innerHTML=profile()
    document.querySelector(".pr__change__img__link").addEventListener("click",()=>{
        document.body.innerHTML=change_img()
    })
}