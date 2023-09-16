import Block from "../../utils/Block";

export class AllComponents extends Block {

    constructor() {
        super({
            validate: {
                login: (value: string) => value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : ''
            },
            onClick: (event:any) => {
                event.preventDefault();
                console.log("click")
            }
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
                </div>
            </div>
        `)
    }
}
