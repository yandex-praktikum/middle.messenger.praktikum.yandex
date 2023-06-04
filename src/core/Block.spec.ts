import { expect } from "chai";

import Block, { Props } from "./Block";

class TestBlock extends Block {
    constructor(props: Props) {
        super(props);
    };

    render() {
        return this.compile(`
            <div>{{text}}</div>
        `, { ...this.props });
    };
};

describe("Block", () => {
    const block = new TestBlock({ text: "Hello World" });
    const text = block.getContent()?.innerHTML;

    it("should render new block", () => {
        expect(text).to.equal("Hello World");
    });
});
