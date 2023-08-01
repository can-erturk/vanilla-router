import Utils from './Utils.js'

class Helpers {
    static generateAbsolutePath(path) {
        
        // Converting "./example" to "example"
        if (path.startsWith('./')) {
            path = path.substr(2)
        }

        // Adding the "/project/rootExample/" directory to the beginning of the given value
        if (!path.includes(Utils.options.root)) {
            if (!path.startsWith('/')) {
                path = Utils.options.root + path
            } else {
                path = Utils.options.root + path.substr(1)
            }
        }

        return path
    }

    static parseAttributes(tag) {
        const attributes = {}

        // Regex for captures attributes with their values
        const regexForAttributes = /(\w+(?:-\w+)*)\s*(?:=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|(\S+?(?=\s|$)|\S+)))?/g
    
        // This loop filters attribute key-value pairs from a given tag
        for (const match of tag.matchAll(regexForAttributes)) {
            const key = match[1]
            const value = match[2]

            /* 
                If the attribute name is not equal to 'script', 
                it is assigned to the 'attributes' object along with its value.
            */
            if (key !== 'script') {
                attributes[key] = value ?? ''
            }
        }
    
        return attributes
    }
}

export default Helpers