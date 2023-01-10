export const template = `
[[ temp_nav? ]]
<main class="profile-wrapper">
    <form class="auth profile">
        [[ link? &href='/' &className='profile__back' &title='{{ back }}' ]]
        <div class="auth__title profile__title">{{ title }}</div>
        <div class="profile__avatar">
            <span></span>
        </div>
        <div class="auth__link profile__edit-avatar">
            [[ link? &href='#profile/' &title='{{ photo }}' ]]
            <input type="file" name="avatar" style="display: none">
        </div>
        [[ input? &name='email' &className='input-text auth__input-text profile__input-text' &placeholder='{{ email }}' &value='test@mail.ru' &disabled='true' ]]
        [[ input? &name='login' &className='input-text auth__input-text profile__input-text' &placeholder='{{ login }}' &value='test' &disabled='true' ]]
        [[ input? &name='first_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ name }}' &value='Василий' &disabled='true' ]]
        [[ input? &name='second_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ surname }}' &disabled='true' ]]
        [[ input? &name='display_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ chat_name }}' &disabled='true' ]]
        [[ input? &name='phone' &className='input-text auth__input-text profile__input-text' &placeholder='{{ phone }}' &value='+79763653344' &disabled='true' ]]
        <div class="auth__link profile__link">
            [[ link? &href='#profile/edit/' &title='{{ edit }}' ]]
        </div>
        <div class="auth__link profile__link">
            [[ link? &href='#profile/password/' &title='{{ edit_password }}' ]]
        </div>
        <div class="auth__link profile__link profile__sign-out">
            [[ link? &href='/' &title='{{ sign_out }}' ]]
        </div>
    </form>
</main>
`;
