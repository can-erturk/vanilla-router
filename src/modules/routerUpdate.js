import Helpers from './Helpers.js'

class RouterUpdate {
    static headUpdate = (page) => {
        
        // Use DOMParser to extract the head content
        const parser = new DOMParser()
        const doc = parser.parseFromString(page, 'text/html')
        const newHead = doc.querySelector('head')
      
        // If there is no new head content, return
        if (!newHead) return
      
        // Remove existing elements with the 'data-routing-tag' attribute
        const existingElements = document.head.querySelectorAll('[data-routing-tag]')
        existingElements.forEach(el => {
            document.head.removeChild(el)
        })
      
        // List of tags to process
        const tagsToProcess = ['meta', 'title', 'link', 'style', 'base', 'noscript']

        // Process the selected tags
        tagsToProcess.forEach(name => {
            const elements = newHead.getElementsByTagName(name)

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i]
                
                // Add the "data-routing-tag" attribute
                element.setAttribute('data-routing-tag', '')
                
                // Append a clone of the element
                document.head.appendChild(element.cloneNode(true))
            }
        })
    }

    static scriptUpdate = (page) => {

        // Remove old scripts defined in subpages
        document.querySelectorAll('[data-routing-script]').forEach(el => {
            document.body.removeChild(el)
        })

        // Extract the 'script' tags from within 'newPage'
        const selectScriptTags = /<script\b[^>]*>([\s\S]*?)<\/script>/g
        const matchedScripts = page.match(selectScriptTags)

        // If a 'script' tag is found
        if (matchedScripts) {
            for (let i = 0; i < matchedScripts.length; i++) {

                // Create a new script
                const script = document.createElement('script')
                script.setAttribute('data-routing-script', '')            

                // Parse script from the new page and use its contents
                const getScriptContent = /<script\b[^>]*>(.*?)<\/script>/i
                const scriptContent = matchedScripts[i].match(getScriptContent)

                // If there is script content, add it to the newly created
                if (scriptContent && scriptContent[1]) {
                    script.innerHTML = scriptContent[1]
                }

                // Parse script from the new page and dont use its contents
                const getScriptWithoutContent = /(<script[^>]*>)[\s\S]*?(<\/script>)/g
                const scriptWithoutContent = matchedScripts[i].replace(getScriptWithoutContent, '$1$2')

                // Define the attributes within an object.
                const scriptAttributes = Helpers.parseAttributes(scriptWithoutContent)

                // Adding the values in the 'attributes' object to new script element
                for(let attribute in scriptAttributes) {
                    script.setAttribute(attribute, scriptAttributes[attribute])
                }

                // Add the newly created script to the end of the body
                document.body.appendChild(script)
            }
        }
    }    
    
    static contentUpdate = async (page) => {
        const response = await fetch(page)
        const newPage = await response.text()

        const regexForHead = /<head>.*<\/head>/s
        const regexForScript = /<script\b[^>]*>([\s\S]*?)<\/script>/g
        
        let newHtml = newPage.replace(regexForHead, '')
        newHtml = newHtml.replace(regexForScript, '')
        document.querySelector('#root').innerHTML = newHtml

        this.headUpdate(newPage)
        this.scriptUpdate(newPage)
    }
}

export default RouterUpdate