import { registerPartials } from '../utils/register-partials';
import { Button } from './button';
import { Form } from './form';
import { Input } from './input';
import { Sidebar } from './sidebar';

import ProfileImg from './profile';

export function setupPartials() {
    const partials = {
        Button: Button,
        Input: Input,
        Form: Form,
        Sidebar: Sidebar,
        ProfileImg: ProfileImg,
    };

    registerPartials(partials);
}
