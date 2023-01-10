export const editPasswordTemplate = `
[[ temp_nav? ]]
<main class="profile-wrapper">
    <form class="auth profile">
        [[ link? &href='#profile' &className='profile__back' &title='{{ back }}' ]]
        <div class="auth__title profile__title">{{ titleEditPassword }}</div>
        [[ input? &name='oldPassword' &type='password' &className='input-text auth__input-text profile__input-text' &placeholder='{{ oldPassword }}' ]]
        [[ input? &name='newPassword' &type='password' &className='input-text auth__input-text profile__input-text' &placeholder='{{ newPassword }}' ]]
        [[ input? &name='newPassword_confirm' &type='password' &className='input-text auth__input-text profile__input-text' &placeholder='{{ confirmPassword }}' ]]
        <button type="submit" class="input-button auth__button profile__button">{{ passwordBtn }}</button>
    </form>
</main>
`;
