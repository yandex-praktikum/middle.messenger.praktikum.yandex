import Handlebars from 'handlebars'
import { Partial } from '../types'

export default (partials: Array<Partial>) => {
  partials.forEach((partial) => {
    Handlebars.registerPartial(partial.name, partial.template)
  })
}
