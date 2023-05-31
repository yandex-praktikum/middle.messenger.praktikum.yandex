/* eslint-disable no-undef */
import HTTPTransport from './HTTPTransport';


describe('HTTPTransport tests', () => {
    const http = new HTTPTransport('https://jsonplaceholder.typicode.com/posts');

    test('Get request', async () => {
        const { response } = await http.get('/1');
        expect(JSON.parse(response).id).toBe(1);
    });

    test('Post request', async () => {
        const data = { title: 'test', body: 'test' };
        const { response } = await http.post('', { data });
        expect(JSON.parse(response).id).toBe(101);
    });

    test('Put request', async () => {
        const data = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
        };
        const { response } = await http.put('/1', { data });
        expect(JSON.parse(response).id).toBe(1);
    });

    test('Delete request', async () => {
        const { response } = await http.delete('/1');
        expect(JSON.parse(response).id).toBe(undefined);
    });
});
