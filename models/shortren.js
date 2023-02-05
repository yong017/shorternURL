const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortrenSchema = new Schema({
  shortURL: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  originalURL: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Shortren', shortrenSchema)