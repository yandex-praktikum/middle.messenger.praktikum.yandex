export const template = `
<div class="container">
    <div class="form-container">
        <h2>Registration Form</h2>
        <form action="javascript:void(0);">
            <input type="text" name="first_name" placeholder="Enter your name" required="" autofocus="">
            <input type="text" name="second_name" placeholder="Enter your last name" required="">
            <input type="email" name="email" placeholder="Enter your email" required="">
            <input type="tel" name="phone" placeholder="Enter phone number" required=false>
            <input type="number" name="age" placeholder="Enter your age" required=false>
            <input type="text" name="city" placeholder="Enter your city" required=false>
            <hr>
            <input type="text" name="login" placeholder="Create your login" required="">
            <input type="password" name="password" placeholder="Create new password">
            <input type="password" name="repeatPassword" placeholder="Repeat password">
            {{{button}}}
        </form>
        <p>
            <a href="/login">Log in</a>
        </p>
    </div>
</div>
</div>
`
