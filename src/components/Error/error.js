import './error.scss';

export default `
    <div class="error">
        <div class="error__number">
            <span>
                {{ code }}
            </span>
        </div>
        <div class="error__text">
            <span>
                {{ text }}
            </span>
        </div>
        <div class="error__link" id="error__link">
            <span>Назад к чатам</span>
        </div>
    </div>
`;
