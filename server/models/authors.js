const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorsSchema = new Schema({
    
    nama: String,
    umur: Number
})

module.exports = mongoose.model('author', authorsSchema)