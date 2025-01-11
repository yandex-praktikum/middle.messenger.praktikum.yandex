import './input.scss';

export default `
    <form class="form" id="form">
        <input class="form__input" id="{{ id }}" name="{{ name }}" type="{{ type }}" placeholder="" value="{{ value }}">
        <label class="form__label" for="{{ labelFor }}">{{ label }}</label>
    </form>
`;
