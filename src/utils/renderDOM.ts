import Block from '../core/Block'

export function render(query: string, block: Block) {
  const root = document.querySelector(query)

  if (!root) {
    throw new Error('Нет рут элемента')
  }

  root.innerHTML= ''

  root.appendChild(block.element)

  return root
}
