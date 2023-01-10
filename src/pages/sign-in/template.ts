export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth">
        <div class="auth__title">{{ title }}</div>
        <div class="auth__error">{{ error }}</div>
        <div class="auth__text">{{ login }}</div>
        [[ input? &name='login' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ password }}</div>
        [[ input? &name='password' &type='password' &className='input-text auth__input-text' ]]
        <button type="submit" class="input-button auth__button">{{ button }}</button>
        <div class="auth__link">
            [[ link? &href='#sign-up' &title='{{ reg_link }}' ]]
        </div>
    </form>
</main>
`;
