export const template_edit = `
 <div class="content page_profile page_profile__edit">
        <a class="button_back" href="/messages">
            <div class="rotate_svg_180">
                {{{svg_send}}}
            </div>
        </a>
        
        <form action="/profile" class="profile_content">
        
             <label class="profile_logo">
                    <input class="profile_logo_input" type="file" name="avatar">
            </label>
            
               
            </input>           
            
             <div class="profile_name">{{name}}</div>
            
                <div class="profile_params">
                
                {{#each params}}
                 <div class="profile_param">
                    <div class="profile_param_name">{{{this.name}}}</div>
                    <div class="profile_param_value">
                        <input type="text" name="{{{this.value_name}}}" value="{{{this.value}}}">
                    </div>
                </div>     
                {{/each}}
            </div>
            <div class="profile_buttons">
                {{{saveButton}}}
            </div>
            
        </form>
 </div>
`

