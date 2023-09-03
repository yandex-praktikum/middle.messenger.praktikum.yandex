import './Item.scss';

//language=hbs
export default `
    <div class='item'>
        <div class='item__data'>
            <span class='item__label'>{{ label }}</span>
            {{# if (or editProfile editPassword) }}
                {{> 'TextInput'
                  class='item__value'
                  value=value
                  name=name
                  placeholder=placeholder
                  type=type
                }}
            {{ else }}
                <span class='item__value'>{{ value }}</span>
            {{/if}}
        </div>
        <div class='item__divider'></div>
    </div>
`;
