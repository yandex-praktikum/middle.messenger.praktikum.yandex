import {Block} from "../../utils/Block";

export class Loader extends Block {
    protected render(): string {
        return (`
            <span class="loader"></span>
        `)
    }
}
