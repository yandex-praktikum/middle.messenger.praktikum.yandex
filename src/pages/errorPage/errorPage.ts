import Block from '@/core/Block'
import './errorPage.css'
import Link from '@/components/link/link'
import { routes } from '@/constants/routes'

const errorPageTemplate = `
<div class="error dialog">
    <h1>{{ errorCode }}</h1>
    <h4 class="error__description">{{ errorText }}</h4>
    {{{ backLink }}}
</div>
`

type ErrorPageProps = {
  errorCode: string
  errorText: string
  backLink: Link
}

class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props)
  }

  render() {
    return this.compile(errorPageTemplate, this.props)
  }
}

export const notFound = new ErrorPage({
  errorCode: '404',
  errorText: 'Не туда попали',
  backLink: new Link({
    to: routes.login,
    label: 'Назад к чатам',
    withId: true,
  }),
})

export const serverError = new ErrorPage({
  errorCode: '500',
  errorText: 'Мы уже фиксим',
  backLink: new Link({
    to: routes.login,
    label: 'Назад к чатам',
    withId: true,
  }),
})
