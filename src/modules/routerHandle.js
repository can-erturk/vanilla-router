import Utils from './Utils.js'
import RouterUpdate from './routerUpdate.js'


class RouterHandle {
    static handle = async () => {    
        const url = window.location.pathname
        const page = Utils.options.pages[url]
        const notFound = Utils.options.pages['*']
    

        if (page) {
            // route found
            RouterUpdate.contentUpdate(page)
        } else if (notFound) {
            // route not found
            RouterUpdate.contentUpdate(notFound)
        }
    }
}


export default RouterHandle