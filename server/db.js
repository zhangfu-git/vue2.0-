const mongoose = require('mongoose')
const Schema = mongoose.Schema
const init = require('./init.json')
const crypto = require('crypto')
const MONGODB_URI = require('../config/db_config.js').MONGODB_URI

const userSchema = new Schema({
  username: String,
  password: String
})

const articleSchema = new Schema({
  title: String,
  date: Date,
  content: String,
  author: String,
  sourceContent: String,
  types: Array
})

const temporaryArticleSchema = new Schema({
  title: String,
  date: Date,
  content: String,
  sourceContent: String,
  author: String,
  types: Array
})

const navSchema = new Schema({
  text: String,
  path: String
})

const socialContactSchema = new Schema({
  src: String,
  path: String,
  isAction: Boolean
})

const userInfoSchema = new Schema({
  username: String,
  blogTitle: String,
  headURL: String,
  motto: String
})

const archiveSchema = new Schema({
  title: String,
  time: Date,
  id: String,
  createdYear: Number,
  createdMonth: Number
})

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  TemporaryArticle: mongoose.model('TemporaryArticle', temporaryArticleSchema),
  Nav: mongoose.model('Nav', navSchema),
  SocialContact: mongoose.model('SocialContact', socialContactSchema),
  UserInfo: mongoose.model('UserInfo', userInfoSchema),
  Archive: mongoose.model('Archive', archiveSchema),
  initialized: false
}

const initialize = function () {
  Models.User.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (!doc.length) {
      console.log('Database opens for the first time...')
      Promise.all(init.map(item => {
          if (item.type === 'User') {
            let md5 = crypto.createHash('md5')
            item.password = md5.update(item.password).digest('hex')
          }
          new Models[item.type](item).save()
      }))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    } else {
      Models.initialized = true
    }
  })
}


mongoose.connect(MONGODB_URI, { auto_reconnect: true })

const db = mongoose.connection

db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
  initialize()
})

module.exports = Models
