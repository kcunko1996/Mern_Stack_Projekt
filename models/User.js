const moongose = require('mongoose');
const Schema = moongose.Schema;

const UserSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  },
  avatar : {
    type: String
  },
  date : {
    type: Date,
    default: Date.now()
  },
})

module.exports = moongose.model('users', UserSchema);