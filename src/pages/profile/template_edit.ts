export const editTemplate = `
[[ temp_nav? ]]
<main class="profile-wrapper">
    <form class="auth profile">
        [[ link? &href='#profile' &className='profile__back' &title='{{ back }}' ]]
        <div class="auth__title profile__title">{{ titleEdit }}</div>
        [[ input? &name='email' &className='input-text auth__input-text profile__input-text' &placeholder='{{ email }}' &value='test@mail.ru' ]]
        [[ input? &name='login' &className='input-text auth__input-text profile__input-text' &placeholder='{{ login }}' &value='test' ]]
        [[ input? &name='first_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ name }}' &value='Василий' ]]
        [[ input? &name='second_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ surname }}' ]]
        [[ input? &name='display_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ chat_name }}' ]]
        [[ input? &name='phone' &className='input-text auth__input-text profile__input-text' &placeholder='{{ phone }}' &value='+79763653344' ]]
        <button type="submit" class="input-button auth__button profile__button">{{ edit }}</button>
    </form>
</main>
`;
