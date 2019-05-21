const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (data) => {
  let errors = {}

 
  data.text = !isEmpty(data.text) ? data.text : ''

  if(!Validator.isLength(data.text, {min: 10, max: 300})){
      errors.text = 'Objava mora sadrzavati izmedu 10 i 30 znakova'
  }

  if(Validator.isEmpty(data.text)){
    errors.text = 'email je obavezno'
  }
  



  return {
    errors,
    isValid: isEmpty(errors)
  }
}