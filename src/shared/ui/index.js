import { registerPartials } from '../utils/register-partials';
import { Button } from './button';
import { Form, FormProfile } from './form';
import { Input } from './input';
import { Modal } from './modal';
import { Sidebar } from './sidebar';
export { Selector } from './selector';

import ProfileImg from './profile';
import { Selector } from './selector';

export function setupPartials() {
    const partials = {
        Button: Button,
        Input: Input,
        Form: Form,
        Sidebar: Sidebar,
        ProfileImg: ProfileImg,
        FormProfile: FormProfile,
        Modal: Modal,
        Selector: Selector,
    };

    registerPartials(partials);
}
