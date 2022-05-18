const {Schema, model} = require('mongoose')

const Number = new Schema({
  code: {type: String},
  number: {type: String}
})

module.exports = model('Number', Number)
