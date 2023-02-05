const express = require('express')
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const URL = require("./models/shortren")
const shortenURL = require("./utils/shortenURL")


// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'produciton') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  if (!req.body.url) return res.redirect("/") //name = "url"
  const shortURL = shortenURL(5)

  URL.findOne({ originalurl: req.body.url })
    .then(data =>
      data ? data : URL.create({ shortURL, originalURL: req.body.url })
    )
    .then(data =>
      res.render("index", {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(error => console.log(error))

})

app.listen(port, () => {
  console.log('app is running on 3000')
})