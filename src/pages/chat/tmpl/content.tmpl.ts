export const content = `
    <div class="wrapper-chats-page">
        <header class="header">
            <div class="header-content-left">
               {{{logo}}}
                <label class="input-search-label">
                    <img src='/src/assets/search.svg' alt="search"/>
                    <input type="search" placeholder="Search for people"/>
                </label>
            </div>
             <div class="header-content-right">
                <img src='/src/assets/notification.svg' alt="notification"/>
                {{{linkToSettings}}}
                <img src='/src/assets/small-avatar.svg' alt="small-avatar"/>
               {{{linkToAuth}}}
            </div>
        </header>
        
        <div class="wrapper-chats">
             <aside class="preview-chats">
                    Music
             </aside>
        
             <div class="main-chats">
                <img src='/src/assets/user.svg' alt="user"/>
                <span>Alexandr Ivanov</span>
             </div>
        </div>
    <div>

`