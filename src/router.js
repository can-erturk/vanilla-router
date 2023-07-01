import { RouterPage, RouterRoot } from './modules/routerDom.js'
import RouterHandle from './modules/routerHandle.js'


// Defining HTML elements that can be used as <router-root> and <router-page>
customElements.define('router-page', RouterPage)
customElements.define('router-root', RouterRoot)


// Listen events for routing
window.addEventListener('popstate', RouterHandle.handle)
window.addEventListener('DOMContentLoaded', RouterHandle.handle)