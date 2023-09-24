import Utils from './Utils.js'
import Helpers from './Helpers.js'

class RouterPage extends HTMLElement {
    connectedCallback() {
        const path = this.dataset.path
        const src = this.dataset.src

        // Get edited url
        const absolutePath = Helpers.generateAbsolutePath(path)
        const absoluteSrc = Helpers.generateAbsolutePath(src)

        if (path === '*') {
            // If the existing router paths and the browser URL do not match, which router path will be used (404)
            Utils.options.pages['*'] = absoluteSrc
        } else {
            // Which file should be called when which router path is requested
            Utils.options.pages[absolutePath] = absoluteSrc
        }
    }
}

class RouterRoot extends HTMLElement {
    connectedCallback() {
        const root = document.createElement('div')
        root.setAttribute('id', 'root')

        this.parentNode.replaceChild(root, this)
    }
}

export { RouterPage, RouterRoot }