import { Block } from '@services';

import './time.css';

interface Props {
  date: string;
}

export class Time extends Block<Props> {

  constructor(props: Props) {
    super('span', 'time', props);
  }

  render(): DocumentFragment {
    const time = new Date(this.props.date);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    return this.compile(null, { time: `${hours}:${minutes}` });
  }
}
