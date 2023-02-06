const mongoose = require('mongoose')
const URL = require("../shortren")

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'produciton') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 3; i++) {
    URL.create({
      shortURL: `good-${i}`, originalURL: `https://www-${i}`
    })
  }
  console.log('done')
})