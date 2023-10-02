export const content = `
    <div class="wrapper-chats-page">
        <header class="header">
            <div class="header-content-left">
               {{{logo}}}
                <label class="input-search-label">
                    <img src='/assets/search.svg' alt="search"/>
                    {{{input}}}
                </label>
            </div>
             <div class="header-content-right">
                <img src='/assets/notification.svg' alt="notification"/>
                {{{linkToSettings}}}
                <img src='/assets/small-avatar.svg' alt="small-avatar"/>
               {{{linkToAuth}}}
            </div>
        </header>
        
        <div class="wrapper-chats">
             <aside class="preview-chats">
                  {{{title}}}
             </aside>
             <div class="main-chats">
                 <div class="main-chats-header">
                     <img src='/assets/user.svg' alt="user"/>
                     <span>Alexandr Ivanov</span>
                 </div>
             </div>
        </div>
    <div>
`
