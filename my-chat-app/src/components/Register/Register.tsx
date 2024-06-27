import React from 'react';
import Handlebars from 'handlebars';
import registerTemplateRaw from '../../templates/register.hbs?raw';
import './Register.scss';

const registerTemplate = Handlebars.compile(registerTemplateRaw);

const Register: React.FC = () => {
    const html = registerTemplate({});
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Register;
