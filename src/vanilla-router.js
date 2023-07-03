import Utils from './modules/Utils.js'
import { RouterPage, RouterRoot } from './modules/routerDom.js'
import RouterHandle from './modules/routerHandle.js'


// Add data-root attribute coming from <router-root> element to options object in Utils.js
const root = document.querySelector('router-root')
Utils.options.root = root.getAttribute('data-root')


// Defining HTML elements that can be used as <router-root> and <router-page>
customElements.define('router-page', RouterPage)
customElements.define('router-root', RouterRoot)


const handleLinks = (e) => {
    const target = e.target
    if (
        !e.ctrlKey &&
        target.tagName === 'A' &&
        target.getAttribute('target') === '_self'
    ) {
        e.preventDefault()
        window.history.pushState(null, null, target.getAttribute('href'))
        RouterHandle.handle()
    }
}

// Listen event for link clicks
window.addEventListener('click', handleLinks)


// Listen events for routing
window.addEventListener('popstate', RouterHandle.handle)
window.addEventListener('DOMContentLoaded', RouterHandle.handle)