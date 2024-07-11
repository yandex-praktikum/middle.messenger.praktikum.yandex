import {loginData} from './authPage/login/login'
import {signinData} from './authPage/signin/signin'
import {profileData} from './profilePages/profile'
import {chatData} from './chat/chatData.js'

export const pageData = {
    '/index.html': {title: 'index'},
    '/pages/authPage/login/login.html': loginData,
    '/pages/authPage/signin/signin.html': signinData,
    '/pages/profilePages/profile.html': profileData.base,
    '/pages/profilePages/profileChangeInfo.html': profileData.changeInfo,
    '/pages/profilePages/profileChangePassword.html': profileData.changePassword,
    '/pages/chat/chat.html': chatData,
}
