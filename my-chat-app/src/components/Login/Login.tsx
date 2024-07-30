import React from 'react';
import Handlebars from 'handlebars';
import loginTemplateRaw from '../../templates/login.hbs?raw';
import './Login.scss';

const loginTemplate = Handlebars.compile(loginTemplateRaw);

const Login: React.FC = () => {
    const html = loginTemplate({});
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Login;
