import Block from './Block.ts';
import Router from './Router.ts';

export interface PropsWithRouter {
  router: typeof Router;
}

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<
    infer P extends Record<string, any>
  >
    ? P
    : any;
  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}
