export const template = `
 <div class="content">
        <div class="form from__high">
            <h1>{{title}}</h1>
            <form action="">
                <div class="inputs">
                      {{#each inputs}}
                        {{{this}}}
                      {{/each}}
                </div>
                
                {{{button}}} 
                <a href="/login">Войти</a>
            </form>

        </div>
    </div>
`
