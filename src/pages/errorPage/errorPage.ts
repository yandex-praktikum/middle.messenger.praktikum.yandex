import './errorPage.css'

export default `
<div class="error dialog">
    <h1>{{ errorCode }}</h1>
    <h4 class="error__description">{{ errorText }}</h4>
    <a class="link" href="#login">Назад к чатам</a>
</div>
`
