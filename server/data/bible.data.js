import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID



let bible
export default class BibleData {
    static async injectDB(conn) {
        if (bible) {
            return
        }

        try {
            bible = await conn.db().collection('books')
        }
        catch (e) {
            console.error(`unable to connect BibleData: ${e}`)
        }
    }

    static async getBooks() {
        let cursor
        try {
            cursor = await bible.aggregate([
                { $group: { _id: "$book", book_id: { $max: "$book_id" } } },
                { $sort: { book_id: 1 } }
            ])
            return await cursor.toArray()
        } catch (e) {
            console.error('unable to get books ' + e)
            return []
        }
    }

    static async getBookById(id) {
        let query = { book_id: id }
        let cursor
        try {
            cursor = await bible.find(query).sort({"chapter":1, "verse":1})
            return await cursor.toArray()
        } catch (e) {
            console.error('unable to get verses ' + e)
            return []
        }
    }

}

