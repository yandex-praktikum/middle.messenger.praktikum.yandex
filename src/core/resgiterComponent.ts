import Handlebars, { HelperOptions } from 'handlebars';
import { BlockType, Props } from './Block';
import mockup from '../data.json';

function getProps(components: string, name: string): Props {
    if (!components || !name) return {};
    const data = mockup as Props;
    const nameSection = `${components[0].toLowerCase() + components.slice(1)}s`;
    if (data) {
        const section: Props = data[nameSection] as Props;
        if (section) {
            const props: Props = section[name] as Props;
            return props || {};
        }
    }
    return {};
}

export function registerComponent(name: string, Component: BlockType) {
    if (name in Handlebars.helpers) {
        throw new Error(`The ${name} component is already registered!`);
    }

    Handlebars.registerHelper(name, function hd(this: unknown, { hash, data, fn }: HelperOptions) {
        let props: Props = {};
        const valueHash = hash;
        if (hash.data && typeof hash.data === 'string') {
            props = getProps(Component.name, hash.data);
        } else if (hash.data) {
            props = hash.data;
        }
        delete valueHash.data;

        const component = new Component(Object.assign(
            props,
            hash,
            { parent: data.root.__parent },
        )); // hash
        const dataAttribute = `data-id="${component.id}"`;

        const newData = data;
        if ('ref' in hash) {
            (newData.root.__refs = newData.root.__refs || {})[hash.ref] = component;
        }

        (newData.root.__children = newData.root.__children || []).push(component);

        (newData.root.__embeds = newData.root.__embeds || []).push(
            (fragment: DocumentFragment) => {
                const stub = fragment.querySelector(`[${dataAttribute}]`);

                if (!stub) {
                    return;
                }

                component.getContent()?.append(...Array.from(stub.childNodes));

                stub.replaceWith(component.getContent()!);
            },
        );

        const contents = fn ? fn(this) : '';

        return `<div ${dataAttribute}>${contents}</div>`;
    });
}

type ImportValue = Record<string, string | BlockType>;
type ImportGlob = Record<string, ImportValue>;

export function registerImports(imports: ImportValue) {
    Object.keys(imports).forEach((name:string) => {
        const value = imports[name];
        if (typeof value === 'string') {
            Handlebars.registerPartial(name, value);
        } else {
            registerComponent(name, value);
        }
    });
}

export function loadImport(importGlob: ImportGlob): ImportValue {
    const result: ImportValue = {};
    Object.keys(importGlob).forEach((path: string) => {
        Object.keys(importGlob[path]).forEach((name: string) => {
            if (name === 'default') {
                const proto = Object.getPrototypeOf(importGlob[path][name]);
                result[proto.name] = importGlob[path][name];
            } else {
                result[name] = importGlob[path][name];
            }
        });
    });
    return result;
}
