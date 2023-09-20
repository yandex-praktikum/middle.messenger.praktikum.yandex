import {IProps,Block} from "../../utils/Block";
import {chat1, mockListChats} from "../../mocks/chat.mocks.ts";
import {mockListMessages} from "../../mocks/chat-message.mocks.ts";
import {mockUser} from "../../mocks/user-profile.mocks.ts";
import { validateName} from "../../utils/validates.utils.ts";
import {IUser} from "../../models/IUser.ts";
import {IChat} from "../../models/IChat.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import {IValidateType} from "../../models/IValidateType.ts";

export interface IAllComponentsProps extends IProps {
    onClick:(event:Event)=>void,
    onLogin:(event:Event)=>void,
    onClickLoadAvatar:(event:Event)=>void,
    user:IUser,
    chat:IChat,
    chatList:IChat[],
    message:IChatMessage,
    messageList:IChatMessage[],
    validate:IValidateType
}
export class AllComponents extends Block {

    constructor() {
        const props:IAllComponentsProps={
            events:{},
            validate:{
                login:validateName
            },
            onClick: (event:Event) => {
                event.preventDefault();
                console.log("click")
            },
            onLogin: (event:Event) => {
                event.preventDefault();
                const login =  this.refs.login.value();
                const password =  this.refs.password.value();

                console.log({
                    login,
                    password
                })
            },
            onClickLoadAvatar: (event:Event) => {
                event.preventDefault();
                console.log("click")
            },
            chat:chat1,
            chatList:mockListChats,
            message:mockListMessages[0],
            messageList:mockListMessages,
            user:mockUser
        }

        super(props)
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
                {{{ InputShort label="Login" type="text" name="login" validate=validate.login ref="login" }}}
                {{{ InputWide label="Login" type="text" name="login" validate=validate.login ref="login" }}}
                {{{ InputSearch label="Search" type="text" name="login" ref="search" }}}
                 {{{Link caption="Login" page="loginPage"  linkIcon=true }}}
                 {{{Link caption="Profile"  type='success' page="page404" }}}
                 {{{Link caption="Edit Profile" page="pageProfileEdit" type='danger' linkLine=true }}}
                 {{{Error errorNumber='400' pageGoBack='' errorText='errorText'}}}
                 {{{ChatItem chat=chat}}}
                {{{ChatList list=chatList}}}
                {{{ Message message=message}}}
               {{{ Message message=message myMessage=true}}}
               {{{ MessageList messageList=messageList currentUser=user}}}
               {{{Loader}}}

<!--               {{{  Modal caption="Load IFile" okText='Save' cancelText='Cancel' okClick=onClick cancelClick=onClick }}}-->
              </div>
            </div>
        `)
    }
}
