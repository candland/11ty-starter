import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['menu', 'openIcon', 'closeIcon']

  connect() {
    this.open = false
  }

  toggle() {
    this.open = !this.open

    if (this.open) {
      this.menuTarget.classList.remove('hidden')
      requestAnimationFrame(() => {
        this.menuTarget.classList.remove('opacity-0')
        this.menuTarget.classList.add('opacity-100')
      })
    } else {
      this.menuTarget.classList.remove('opacity-100')
      this.menuTarget.classList.add('opacity-0')
      this.menuTarget.addEventListener('transitionend', () => {
        if (!this.open) this.menuTarget.classList.add('hidden')
      }, { once: true })
    }

    this.openIconTarget.classList.toggle('hidden', this.open)
    this.closeIconTarget.classList.toggle('hidden', !this.open)
  }

  close() {
    if (!this.open) return
    this.open = false
    this.menuTarget.classList.remove('opacity-100')
    this.menuTarget.classList.add('opacity-0', 'hidden')
    this.openIconTarget.classList.remove('hidden')
    this.closeIconTarget.classList.add('hidden')
  }
}
