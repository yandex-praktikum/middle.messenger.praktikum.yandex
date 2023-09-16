import Block from "../../utils/Block";
import {chat1, mockListChats} from "../../mocks/chat.mocks.ts";

export class AllComponents extends Block {

    constructor() {
        super({
            validate: {
                login: (value: string) => value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : ''
            },
            onClick: (event:any) => {
                event.preventDefault();
                console.log("click")
            },
            onClickLoadAvatar: (event:any) => {
                event.preventDefault();
                console.log("click")
            },
            chat:chat1,
            chatList:mockListChats
        });
    }

    protected render(): string {
        return(`
            <div class="container container-center">
              <div class="container-all">
                {{{ Button caption="sign in"}}}
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
              </div>
            </div>
        `)
    }
}
