import Block, { Props } from '../../core/Block'
import Button from '../../components/button/button'

type TestPageProps = {
  testButton: Button
} & Props

const testPageTemplate: string = `<div>{{{ testButton }}}</div>`

export class testPage extends Block {
  constructor(props: TestPageProps) {
    super('div', props)
  }

  render() {
    return this.compile(testPageTemplate, this.props)
  }
}
