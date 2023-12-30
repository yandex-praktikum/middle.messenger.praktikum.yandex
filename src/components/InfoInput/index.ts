import Block from '../../utils/Block'
import template from './infoInput.hbs'
import './infoInput.scss'

interface InfoInputProps {
  field: string
  name: string
  value?: string | number
  type?: string
}

export default class InfoInput extends Block {
  constructor(props: InfoInputProps) {
    super(props)
  }
  render() {
    return this.compile(template, this.props)
  }
}
