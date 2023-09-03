import './Modal.scss';

// language=hbs
export default `
    <div class='wrapper wrapper_max wrapper_modal'>
        {{> 'Form'
            title=title
            mainButtonTitle=buttonTitle
            additionalButtonTitle='Отменить'
            text=text
            imgLoad=imgLoad
            avatar=avatar
            errorText=errorText
        }}
    </div>
`;
