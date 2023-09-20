import {Block} from "../../utils/Block.ts";

export class Page404 extends Block {
    constructor() {
        super({events:{}});
    }

   protected render(): string {
        return (`
            <div class="container container-center">
                {{{ Error errorNumber="404" errorText="Page Not Found" page="pageChat" }}
            </div>`)
    }
}
