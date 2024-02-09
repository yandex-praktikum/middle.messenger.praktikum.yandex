export const template_edit_password = `
 <div class="content page_profile ">
        <a class="button_back" href="/profile">
            <div class="rotate_svg_180">
                {{{svg_send}}}
            </div>
        </a>
        
        <div class="profile_content">
              <div class="profile_logo"></div>  
            
               
            </input>           
            
             <div class="profile_name">{{name}}</div>
            <form action="/profile">
                <div class="profile_params">
                
                {{#each params}}
                 <div class="profile_param">
                    <div class="profile_param_name">{{{this.name}}}</div>
                    <div class="profile_param_value">
                        <input type="password" name="{{{this.value_name}}}" value="{{{this.value}}}" placeholder="{{{this.placeholder}}}">
                    </div>
                </div>     
                {{/each}}
            </div>
            <div class="profile_buttons">
                {{{saveButton}}}
            </div>
            </form>
        </div>
 </div>
`

