import { Page } from '@layout';

import { Block } from '../block/block';

export type ConstructableBlock = new () => Block;

type RenderStage = 'mount' | 'unmount';

function renderDOM(id: string, block: Block, stage: RenderStage) {
	const root = document.getElementById(id)!;

	if (stage === 'mount') {
		root.appendChild(block.getContent());
		block.dispatchComponentDidMount();
	} else {
		block.dispatchComponentWillUnmount();
		root.innerHTML = '';
	}

	return root;
}

export class Route {

	private _page: Page | null = null;

	constructor(public readonly pathname: string,
							public readonly Block: ConstructableBlock,
							public readonly auth: boolean,
							public readonly rootId: string) {
	}

	leave() {
		if (!this._page) {
			return;
		}

		renderDOM(this.rootId, this._page, 'unmount');
		this._page = null;
	}

	render() {
		if (this._page) {
			return;
		}

		this._page = new Page({ child: new this.Block() });
		renderDOM(this.rootId, this._page, 'mount');
	}
}
