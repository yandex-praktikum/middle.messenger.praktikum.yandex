import Block from '../../utils/Block'
import template from './userPhoto.hbs'
import './userPhoto.scss'

interface UserPhotoProps {
  src: string
  alt: string
  name: string
}

export default class UserPhoto extends Block {
  constructor(props: UserPhotoProps) {
    super(props)
  }
  render() {
    return this.compile(template, this.props)
  }
}
