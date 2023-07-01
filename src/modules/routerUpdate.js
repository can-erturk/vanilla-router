class RouterUpdate {
    static contentUpdate = async (page) => {
        const response = await fetch(page)
        const newPage = await response.text()

        document.querySelector('#root').innerHTML = newPage
    }
}

export default RouterUpdate