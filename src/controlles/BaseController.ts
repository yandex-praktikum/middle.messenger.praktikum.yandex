import router from '../classes/Router';

export default class BaseController {
    public router: typeof router = router;

    public getResponseError(response) {
        if (response.status === 200) {
            return [true, response.response];
        }
        alert('Запрос выполнен с ошибкой');
        return [false, {}];
    }
}
