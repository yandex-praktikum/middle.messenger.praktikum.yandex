export const template = `
 <div class="content">
        <div class="form">
            <h1>{{title}}</h1>
            <form action="/messages">
                <div class="inputs">
                       {{{inp}}}
                       {{{inp2}}}
                </div>
                
                {{{button}}} 
                <a href="/register">Нет аккаунта?</a>
            </form>

        </div>
    </div>
`
