import './modal.css'

export class Modal {
  private modalElement: HTMLElement
  private overlayElement: HTMLElement

  constructor() {
    this.modalElement = document.createElement('div')
    this.modalElement.className = 'modal'
    this.modalElement.innerHTML = `
            <div class="modal-content">
                <span class="modal-content__close-button">&times;</span>
                <h2 class="modal-content__title">Modal Title</h2>
                <div class="modal-content__content">Your content goes here.</div>
            </div>
        `

    this.overlayElement = document.createElement('div')
    this.overlayElement.className = 'overlay'

    document.body.appendChild(this.overlayElement)
    document.body.appendChild(this.modalElement)

    this.bindEvents()
  }

  setContent(title: string, content: HTMLElement | DocumentFragment): void {
    const titleElement = this.modalElement.querySelector('h2')
    const contentElement = this.modalElement.querySelector(
      '.modal-content__content'
    )

    if (titleElement) {
      titleElement.textContent = title
    }

    if (contentElement) {
      contentElement.innerHTML = '' // Clear existing content
      contentElement.appendChild(content) // Append the new content
    }
  }

  private bindEvents(): void {
    const closeButton = this.modalElement.querySelector(
      '.modal-content__close-button'
    ) as HTMLElement
    closeButton.addEventListener('click', () => this.close())
    this.overlayElement.addEventListener('click', () => this.close())
  }

  open(): void {
    this.modalElement.style.display = 'block'
    this.overlayElement.style.display = 'block'
  }

  close(): void {
    this.modalElement.style.display = 'none'
    this.overlayElement.style.display = 'none'
  }
}