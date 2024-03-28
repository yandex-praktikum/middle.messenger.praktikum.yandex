import { registerPartials } from '../utils/register-partials';
import { Button } from './button';
import { Form } from './form';
import { Input } from './input';

export function setupPartials() {
    const partials = {
        Button: Button,
        Input: Input,
        Form: Form,
    };
    registerPartials(partials);
}
