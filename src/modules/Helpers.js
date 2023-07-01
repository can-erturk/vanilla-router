import Utils from './Utils.js'


class Helpers {
    static generateAbsolutePath(path) {
        
        // Converting "./example" to "example"
        if (path.startsWith("./")) {
            path = path.substr(2)
        }

        // Adding the "/project/rootExample/" directory to the beginning of the given value
        if (!path.includes(Utils.options.root)) {
            if (!path.startsWith("/")) {
                path = Utils.options.root + path
            } else {
                path = Utils.options.root + path.substr(1)
            }
        }

        return path
    }
}

export default Helpers