import './Form.scss';

// language=hbs
export default `
    <form class='form'>
        <div class='form__header'>
            <h3 class='form__title'>{{ title }}</h3>
        </div>
        <div class='form__body'>
            {{# if text }}
                <p class='form__text'>{{ text }}</p>
            {{/if}}
            {{# if fields }}
                <ul class='form__fields-list'>
                    {{# each fields }}
                        {{> 'FormInput'
                                title=this.label
                                type=this.type
                                name=this.name
                                error=this.error
                                errorText=this.errorText
                        }}
                    {{/ each }}
                </ul>
            {{/if}}
            {{# if imgLoad }}
                {{> 'ImageInput' withAddIcon=true withRemoveIcon=(or avatar '') avatar=avatar errorText=errorText }}
            {{/if}}
        </div>
        <div class='form__footer'>
            {{> 'PrimaryButton' title=mainButtonTitle class='modal-width' }}
            {{> 'LinkButton' title=additionalButtonTitle class='modal-width' }}
        </div>
    </form>
`;
