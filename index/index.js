import Handlebars from "handlebars"
import './style.styl';
import "./index.styl"
import index from "./index.hbs"
import butSignIn from "/components/button/button.js"

Handlebars.registerPartial('index',`<a href="/index.html" class="index">index</a>`)

document.body.innerHTML=index()
document.querySelector(".in__div__button__sign__in").innerHTML=butSignIn("butSignIn","Sign in")

import sign_up from "/sign_up/sign_up"
document.querySelector("#sign_up").addEventListener("click",()=>{
    sign_up()
})

import profile from "/profile/profile"
document.querySelector("#profile").addEventListener("click",()=>{
    profile()
})

import {chat} from "/chat/chat"
document.querySelector("#chat").addEventListener("click",()=>{
    chat()
})

import {chat_list} from "/chat/chat"
document.querySelector("#chat_list").addEventListener("click",()=>{
    chat_list()
})

import {error404} from "/errors/errors"
document.querySelector("#error404").addEventListener("click",()=>{
    error404()
})

import {error500} from "/errors/errors"
document.querySelector("#error500").addEventListener("click",()=>{
    error500()
})

window.onload=function(){
    window.addEventListener("popstate", function(e) {
    console,log("false")
    }, true);}