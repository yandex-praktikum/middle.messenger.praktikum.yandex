import router from '../classes/Router';
import Store from '../classes/Store';

export default class BaseController {
    public router: typeof router = router;

    public store: typeof Store = Store;
}
