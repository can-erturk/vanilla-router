import Utils from './Utils.js';
import Helpers from './Helpers.js';


class RouterUpdate {

    static headUpdate = (page) => {
        const regex = /<head>([^]*?)<\/head>/i
        const matches = page.match(regex)

        if (!matches || matches.length <= 1) {
            return
        }

        const { defaultHead } = Utils.options
        const newHead = matches[1].trim()
        document.head.innerHTML = `${defaultHead} ${newHead}`
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