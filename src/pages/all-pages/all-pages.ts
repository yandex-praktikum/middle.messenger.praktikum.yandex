import {Block} from "../../utils/Block";

export class AllPages extends Block {

    constructor() {
        super({events:{}});
    }

    protected render(): string {
        return(`
            <div class="container container-center">
                <div class="">
                    {{{Link caption="Page 500"  type='success' page="page500" }}}
                    {{{Link caption="Login Page"  type='success' page="loginPage" }}}
                    {{{Link caption="Page Registration"  type='success' page="pageRegistration" }}}
                    {{{Link caption="Page Profile"  type='success' page="pageProfile" }}}
                    {{{Link caption="Page Profile Edit"  type='success' page="pageProfileEdit" }}}
                    {{{Link caption="Page Password Edit"  type='success' page="pagePasswordEdit" }}}
                    {{{Link caption="Page IChat"  type='success' page="pageChat" }}}
                    {{{Link caption="All Components"  type='success' page="allComponents" }}}
                </div>
            </div>
        `)
    }
}
