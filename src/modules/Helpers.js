class Helpers {
    static generateAbsolutePath(path) {
        
        // Converting "./example" to "example"
        if (path.startsWith("./")) {
            path = path.substr(2)
        }

        // Adding the "/project/rootExample/" directory to the beginning of the given value
        if (!path.includes('/router/')) {
            if (!path.startsWith("/")) {
                path = '/router/' + path
            } else {
                path = '/router/' + path.substr(1)
            }
        }

        return path
    }
}

export default Helpers