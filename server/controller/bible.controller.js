import BibleData from '../data/bible.data.js'
export default

    class BibleController {
    
    static async apiGetBooks(req, res, next) {
        try {
            let books = await BibleData.getBooks()
            res.json(books)
        } catch (e) {
            console.log(`api,${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetBookById(req, res, next) {
        try {
            console.log('params: ' + req.params.id)
            let id = parseInt(req.params.id) || {}
            let book = await BibleData.getBookById(id)
            if (!book) {
                res.status(404).json({ error: "not found" })
                return
            } 
            res.json(book)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}







