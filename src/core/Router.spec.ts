import { expect } from "chai";
import { JSDOM } from "jsdom";

import Router from "./Router";

const dom = new JSDOM(`<div id="root"></div>`, { url: "http://localhost:3000" });

(global as any).document = dom.window.document;
(global as any).window = dom.window;

class TestBlock_1 {
    getContent() {
        const div = document.createElement("div");
        div.setAttribute("id", "my-component-1");
        return div;
    };

    show() {
        this.getContent().style.display = "block";
    };

    hide() {
        this.getContent().style.display = "none";
    };
};

class TestBlock_2 {
    getContent() {
        const div = document.createElement("div");
        div.setAttribute("id", "my-component-2");
        return div;
    };

    show() {
        this.getContent().style.display = "block";
    };

    hide() {
        this.getContent().style.display = "none";
    };
};

describe("Router", () => {

    it("should there be an element", () => {
        Router.use("/", TestBlock_1, {}).start();
        expect(document.getElementById("my-component-1")).not.to.be.null;
    });

    it("should go to right path", () => {
        Router
            .use("/", TestBlock_1, {})
            .use("/2", TestBlock_2, {})
            .start();

        Router.go("/2");
        // @ts-ignore
        expect(Router.getCurrentRoute()._pathname).to.equal("/2");
    });

});
