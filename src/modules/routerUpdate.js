import Utils from './Utils.js';


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


    static contentUpdate = async (page) => {
        const response = await fetch(page)
        const newPage = await response.text()

        const regexForHead = /<head>.*<\/head>/s
        
        const newHtml = newPage.replace(regexForHead, '')
        document.querySelector('#root').innerHTML = newHtml

        this.headUpdate(newPage)
    }

}


export default RouterUpdate