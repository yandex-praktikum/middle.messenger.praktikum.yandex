import button from "./button.hbs"
import "./button.styl"

export default (butName, butValue)=>{
    return button({butName:butName, butValue:butValue})
}