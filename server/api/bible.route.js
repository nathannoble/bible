import express from 'express'
const router = express.Router() // get access to express router 
import BibleController from '../controller/bible.controller.js'

router.route('/').get(BibleController.apiGetBooks)
router.route("/books").get(BibleController.apiGetBooks)
router.route("/book/:id").get(BibleController.apiGetBookById)

export default router

