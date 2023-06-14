export const template = `
<div class="container">
    <div class="form-container">
        <h2>Login</h2>
        <form action="javascript:void(0);">
            <input type="login" name="login" placeholder="Login/Username" value="RandomHero" required="" autofocus="">
            <input type="password" name="password" placeholder="Password" value="admin" required="">
            {{{button}}}
        </form>
        <p>
            <a href="/register">Create new account</a>
        </p>
    </div>
</div>
`
