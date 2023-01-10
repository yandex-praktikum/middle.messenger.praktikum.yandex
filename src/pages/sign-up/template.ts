export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth">
        <div class="auth__title">Регистрация</div>
        <div class="auth__error">{{ error }}</div>
        <div class="auth__text">{{ email }}</div>
        [[ input? &name='email' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ login }}</div>
        [[ input? &name='login' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ name }}</div>
        [[ input? &name='first_name' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ surname }}</div>
        [[ input? &name='second_name' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ phone }}</div>
        [[ input? &name='phone' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ password }}</div>
        [[ input? &name='password' &type='password' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ password_confirm }}</div>
        [[ input? &name='password_confirm' &type='password' &className='input-text auth__input-text' ]]
        <button type="submit" class="input-button auth__button">{{ button }}</button>
        <div class="auth__link">
            [[ link? &href='#sign-in' &title='{{ login_link }}' ]]
        </div>
    </form>
</main>
`;
