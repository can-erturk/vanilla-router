import Utils from './Utils.js'
import Helpers from './Helpers.js'


class RouterPage extends HTMLElement {
    connectedCallback() {
        const path = this.dataset.path
        const src = this.dataset.src

        // Get edited url
        const absolutePath = Helpers.generateAbsolutePath(path)

        if (path === '*') {
            // If the existing router paths and the browser URL do not match, which router path will be used (404)
            Utils.options.pages['*'] = src
        } else {
            // Which file should be called when which router path is requested
            Utils.options.pages[absolutePath] = src
        }
    }
}