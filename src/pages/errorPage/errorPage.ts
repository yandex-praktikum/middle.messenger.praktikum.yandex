import Block from '../../core/Block'
import './errorPage.css'

const errorPageTemplate = `
<div class="error dialog">
    <h1>{{ errorCode }}</h1>
    <h4 class="error__description">{{ errorText }}</h4>
    <a class="link" href="#login">Назад к чатам</a>
</div>
`

type ErrorPageProps = {
  errorCode: string
  errorText: string
}

class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props)
  }

  render(): DocumentFragment {
    return this.compile(errorPageTemplate, this.props)
  }
}

export const notFound = new ErrorPage({
  errorCode: '404',
  errorText: 'Не туда попали',
})

export const serverError = new ErrorPage({
  errorCode: '500',
  errorText: 'Мы уже фиксим',
})
