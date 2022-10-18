import chathbs from "./chat.hbs"
import chat_listhbs from "./chat_list.hbs"
import {users} from "./dataChat.js"
import "./chat_list.styl"
import "./chat.styl"

const chat=()=>{
    document.body.innerHTML=chathbs({users:users})
    document.querySelector("#title").textContent="chat"
}

const chat_list=()=>{
    document.body.innerHTML=chat_listhbs({users:users})
    document.querySelector("#title").textContent="chat_list"
}


export {chat, chat_list}