import React from 'react';
import Handlebars from 'handlebars';
import error500TemplateRaw from '../../templates/500.hbs?raw';
import './Error500.scss';

const error500Template = Handlebars.compile(error500TemplateRaw);

const Error500: React.FC = () => {
    const html = error500Template({});
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Error500;
