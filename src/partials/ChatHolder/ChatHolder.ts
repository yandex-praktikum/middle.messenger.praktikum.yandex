import { Block } from "../../core";

class ChatHolder extends Block {
    static componentName = "ChatHolder";

    protected render() {
        return `
            <div class="chat__holder">
                <div class="chat__box">
                    <a class="chat__profile" href="profile">
                        Профиль
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M1 9L5 5L1 1" stroke="#999999" />
                        </svg>
                    </a>
                    <label class="chat__search-label">
                        <input class="chat__search-input" type="text" placeholder="Поиск">
                        <svg class="chat__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.5924 11.4138C10.1605 12.8457 7.83886 12.8457 6.40694 11.4138C4.97502 9.9819 4.97502 7.6603 6.40694 6.22837C7.83886 4.79645 10.1605 4.79645 11.5924 6.22837C13.0243 7.6603 13.0243 9.9819 11.5924 11.4138ZM12.0328 12.7968C10.0725 14.2962 7.25696 14.1495 5.46413 12.3566C3.51151 10.404 3.51151 7.23819 5.46413 5.28556C7.41675 3.33294 10.5826 3.33294 12.5352 5.28556C14.3279 7.07831 14.4747 9.89373 12.9755 11.8539L16.5423 15.4206L15.5994 16.3635L12.0328 12.7968Z"
                                fill="#999999" />
                        </svg>
                    </label>
                </div>
            </div>
        `;
    }
}

export default ChatHolder;
