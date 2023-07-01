import Utils from './Utils.js'


class RouterHandle {
    static handle = async () => {    
        const url = window.location.pathname
        const page = Utils.options.pages[url]
        const notFound = Utils.options.pages['*']
    

        if (page) {
            // route found
        } else if (notFound) {
            // route not found
        }
    }
}


export default RouterHandle