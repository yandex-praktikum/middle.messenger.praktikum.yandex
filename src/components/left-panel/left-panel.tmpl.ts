const leftPanel = `
<aside class="side-bar">
    <div class="side-bar__header">
        <div class="side-bar__button">
            <a href="../profile/profile.html" class="side-bar__button-link">Профиль ></a>
        </div>
        <div class="side-bar__search-block">
            <input type="text" name="search" id="search" class="side-bar__search-input" placeholder="Поиск">
            <img src="../../../static/images/search.svg" alt="Search" class="side-bar__image ">
        </div>
    </div>
    <div class="side-bar__bottom user">
        <ul class="user__inner">
            {{{chatItems}}}
        </ul>
    </div>
</aside>
`;

export { leftPanel };
