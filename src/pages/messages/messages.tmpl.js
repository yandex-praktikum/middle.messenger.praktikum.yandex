export const template = `
 <div class="messages">
        <div class="chats">
            <a href="/profile" class="profile">Профиль {{{svg_arrow_right}}}</a>
            <div class="search">
                {{{input_search}}}
            </div>
            <div class="chat_list">
                   {{#each chat_list}}
                   
                   {{#if this.active}}
                    <div class="chat chat_active">
                    {{else}}
                     <div class="chat">
                    {{/if}}
                    
                    <div class="image"></div>
                    <div class="data">
                        <div class="name">{{{this.name}}}</div>
                        <div class="text">{{this.last_message.text}}</div>
                    </div>
                    <div class="info">
                        <div class="date">{{this.last_message.date}}</div>
                        {{#if this.last_message.new_messages}}
                            <div class="new">
                                <p>{{this.last_message.new_messages}}</p>
                            </div>
                        {{/if}}
                        
                    </div>
                </div>
                        
                {{/each}}
                
            </div>
            
        </div>
        <div class="content">
            <div class="chat_header">
                <div class="chat_header_info">
                    <div class="image"></div>
                    <div class="chat_header_name">Andrey</div>
                </div>
                <div class="more">
                    {{{more_svg}}}
                </div>
            </div>
            <div class="content_messages">
                <div class="content_messages_message">
                    {{#each chat_messages}}
                        {{{this.text}}}
                     
                    <div class="time">
                        {{{this.date}}}
                    </div>
                     {{/each}}
                </div>
            </div>
            <div class="chat_bottom">
                <div class="file">
                    {{{svg_file}}}
                </div>

                <input type="text" name="message" class="send_area" placeholder="Сообщение">

                <div class="send">
                    {{{svg_send}}}

                </div>
            </div>
        </div>
    </div>
`
