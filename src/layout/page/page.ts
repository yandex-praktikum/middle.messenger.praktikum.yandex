import { Block } from '@services';

import './page.css';

interface Props {
  child: Block;
}

export class Page extends Block<Props> {

  constructor(props: Props) {
    super('main', 'page', props);
  }

  render(): DocumentFragment {
    return this.compile();
  }
}
