const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
function dao(url) {
 
  mongoose.connect(url)
 
  const userSchema = new Schema({
    name:  String
  })
  const taskSchema = new Schema({
    userId: String,
    task:  String
  })
 
  return {
    User:  mongoose.model('User', userSchema),
    Task:  mongoose.model('Task', taskSchema)
  }
}

module.exports = dao