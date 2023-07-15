export const template = `
<div class='login__container'>
    <div class='login'>
        <h1 class='login__title'>{{title}}</h1>
        <form class='login__form form'>
            <div class='login__inputs'>
                {{{inputs}}}
            </div>
            <div class='login__submit'>
                {{{button}}}
            </div>
        </form>
        <p class='login__links'>{{textLink}} <a href="{{linkUrl}}">{{link}}</a></p>
    </div>
</div>
`;