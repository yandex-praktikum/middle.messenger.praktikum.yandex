import { registerPartials } from '../utils/register-partials';
import { Button } from './button';
import { Form, FormProfile } from './form';
import { Input } from './input';
import { Sidebar } from './sidebar';

import ProfileImg from './profile';
import { Modal } from './modal';

export function setupPartials() {
    const partials = {
        Button: Button,
        Input: Input,
        Form: Form,
        Sidebar: Sidebar,
        ProfileImg: ProfileImg,
        FormProfile: FormProfile,
        Modal: Modal,
    };

    registerPartials(partials);
}
