export const template = `
<div class="panel right-panel">
    <div class="tools-container">
    {{{buttons.back}}}
    {{{buttons.settings}}}
    </div>
    <div class="profile">
        <div class="form-container">
            <div class="avatar-container-profile">
                <img src="{{profile.avatar}}" alt="Avatar" title="Click to change your avatar">
            </div>
            <form action="javascript:void(0);">
                <input type="file" name="avatar" style="display:none;">
                <input type="text" name="first_name" value="{{profile.first_name}}" required="" autofocus="">
                <input type="text" name="second_name" value="{{profile.second_name}}" required="">
                <input type="email" name="email" value="{{profile.email}}" required="">
                <input type="tel" name="phone" value="{{profile.phone}}" required="false">
                <input type="number" name="age" value="{{profile.age}}" required="false">
                <input type="text" name="city" value="{{profile.city}}" required="false">
                <hr>
                <input type="password" name="oldPassword" placeholder="Enter your old password">
                <input type="password" name="newPassword" placeholder="Create new password">
                <input type="password" name="repeatPassword" placeholder="Repeat password">
                {{{saveButton}}}
            </form>
        </div>
    </div>
</div>
`
