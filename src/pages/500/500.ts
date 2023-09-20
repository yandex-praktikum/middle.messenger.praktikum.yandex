import {Block} from "../../utils/Block.ts";

export class Page500 extends Block {
    constructor() {
        super({events:{}});
    }

   protected render(): string {
        return (`
            <div class="container container-center">
                {{{ Error errorNumber="500" errorText="Something went wrong :(" page="pageChat" }}}
            </div>`)
    }
}
