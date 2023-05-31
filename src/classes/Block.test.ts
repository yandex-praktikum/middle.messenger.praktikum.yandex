/* eslint-disable no-undef */
import Block, { TProps } from './Block';

class TestBlock extends Block {
    constructor(props: TProps | undefined) {
        super('div', props);
    }

    render() {
        return this.props.text;
    }
}

const testChildren = new TestBlock({ text: 'child' });

describe('sum module', () => {
    test('Create components test', () => {
        const testBlock = new TestBlock({ text: 'test text' });
        expect(testBlock.getContent().outerHTML).toBe('<div>test text</div>');
    });
    test('Create components attributes test', () => {
        const testBlock = new TestBlock({ attr: { class: 'testClass' } });
        expect(testBlock.getContent().className).toBe('testClass');
    });
    test('componentDidUpdate method test', () => {
        const testBlock = new Block('div');
        expect(testBlock.componentDidUpdate({}, { attr: { class: 'testClass' } })).toBe(true);
    });
    test('addEvents test', () => {
        const testBlock = new TestBlock({
            events: {
                click: () => 'test',
            },
        });
        expect(testBlock.events.click !== undefined).toBe(true);
    });

    test('Add Children test', () => {
        const testBlock = new TestBlock({
            innerBlock: testChildren,
        });
        expect(testBlock.children.innerBlock.getContent().innerHTML).toBe('child');
    });
});
