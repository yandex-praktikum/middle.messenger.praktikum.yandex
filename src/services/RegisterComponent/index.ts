import Handlebars, { HelperOptions } from 'handlebars';

import Block from '../Component';

export function registerComponent(name: string, Component: typeof Block) {
  if (name in Handlebars.helpers) {
    throw new Error(`The ${name} component is already registered!`);
  }

  Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
    const component = new Component(hash);
    const dataAttribute = `data-id="${component.id}"`;

    if ('ref' in hash) {
      // eslint-disable-next-line no-underscore-dangle
      (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
    }

    // eslint-disable-next-line no-underscore-dangle
    (data.root.__children = data.root.__children || []).push({
      component,

      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) {
          return;
        }

        // eslint-disable-next-line unicorn/prefer-spread
        component.getContent()?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.getContent()!);
      },
    });

    const contents = fn ? fn(this) : '';

    return `<div ${dataAttribute}>${contents}</div>`;
  });
}
