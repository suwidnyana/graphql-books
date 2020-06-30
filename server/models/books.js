const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boooksSchema = new Schema({
    
    judul: String,
    jenis: String,
    authorid: String
})

module.exports = mongoose.model('Book', boooksSchema)