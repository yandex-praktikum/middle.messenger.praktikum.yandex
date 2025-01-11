import './footer.scss';

export default `
    <div class="footer" id="footer">
        <button class="footer__button footer__action" data-id="{{ id }}">
            <span>{{ title }}</span>
        </button>
        <a href="#" class="footer__link footer__action" data-id="{{ link }}">{{ linkText }}</a>
    </div>
`;
