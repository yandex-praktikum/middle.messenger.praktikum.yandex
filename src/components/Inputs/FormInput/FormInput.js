import './FormInput.scss';

// language=hbs
export default `
    <li class='form-field'>
        <label class='form-field__label'>
            {{ title }}
            <input class='form-field__input' name='{{ name }}' type='{{ type }}'/>
            {{> 'ErrorMessage' errorText=errorText }}
        </label>
    </li>
`;
