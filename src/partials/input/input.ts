// language=hbs
import './input.css'
export default `
    <div class="input">
        <label class="input__label" for="{{name}}">
            {{label}}
            <input class="input__input" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" />
        </label>
    </div>
`
