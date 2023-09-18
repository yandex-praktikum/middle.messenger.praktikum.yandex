import Block from "../../utils/Block";
import {chat1, mockListChats} from "../../mocks/chat.mocks.ts";
import {mockListMessages} from "../../mocks/chat-message.mocks.ts";
import {mockUser} from "../../mocks/user-profile.mocks.ts";

export class AllComponents extends Block {

    constructor() {
        super({

            onClick: (event:any) => {
                event.preventDefault();
                console.log("click")
            },
            onLogin: (event:any) => {
                event.preventDefault();
                const login =  this.refs.login.value();
                const password =  this.refs.password.value();

                console.log({
                    login,
                    password
                })
            },
            onClickLoadAvatar: (event:any) => {
                event.preventDefault();
                console.log("click")
            },
            chat:chat1,
            chatList:mockListChats,
            message:mockListMessages[0],
            messageList:mockListMessages,
            user:mockUser
        });
    }

    protected render(): string {
        return(`
            <div class="container container-center">
              <div class="container-all">
                {{{ Button caption="sign in" onClick=onClick}}}
                {{{ Button type="number" caption="330"}}}
                {{{ Button type="arrow" onClick=onClick}}}           
                {{{ Button type="dots" onClick=onClick}}}           
                {{{ Button type="paperclip" onClick=onClick}}}           
                {{{ Button type="cancel" onClick=onClick}}}  
                {{{ Badge text="01.20" type="primary"}}}
                {{{ Badge text="01.20" type="ready"}}}         
                {{{ Badge text="01.20" }}}         
                {{{ Avatar isLoadAvatar=false size='sm' onClickLoadAvatar=onClickLoadAvatar}}}
                {{{ Avatar imageUrl="1.jpeg" isLoadAvatar=false onClickLoadAvatar=onClickLoadAvatar}}}
                {{{ Avatar imageUrl="2.jpg" isLoadAvatar=true onClickLoadAvatar=onClickLoadAvatar}}}
                {{{ Avatar imageUrl="3.jpg" isLoadAvatar=true onClickLoadAvatar=onClickLoadAvatar}}}
                {{{ChatItem chat=chat}}}
                {{{ChatList list=chatList}}}
                
                {{{Link caption="Login" page="loginPage"  linkIcon=true }}}
                 {{{Link caption="Profile"  type='success' page="page404" }}}
                 {{{Link caption="Edit Profile" page="pageProfileEdit" type='danger' linkLine=true }}}
                  {{{Error errorNumber='400' pageGoBack='' errorText='errorText'}}}
                  
            {{{ InputShort label="Login" type="text" name="login" validate=validate.login ref="login" }}}
            {{{ InputSearch label="Search" type="text" name="login" ref="search" }}}
            
            
               {{{ Message message=message}}}
               {{{ Message message=message myMessage=true}}}
               {{{ MessageList messageList=messageList currentUser=user}}}
<!--               {{{  Modal caption="Load IFile" okText='Save' cancelText='Cancel' okClick=onClick cancelClick=onClick }}}-->
              </div>
            </div>
        `)
    }
}
