const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (data) => {
  let errors = {}

 
  data.title = !isEmpty(data.title) ? data.title : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.from = !isEmpty(data.from) ? data.from : ''


  if(Validator.isEmpty(data.title)){
    errors.title = 'Naziv je obavezno'
  }
  
  if(Validator.isEmpty(data.company)){
    errors.company = 'Tvrtka nije validan'
  }
  if(Validator.isEmpty(data.from)){
    errors.from = 'Pocetak  je obavezna'
  }

console.log(errors)
  return {
    errors,
    isValid: isEmpty(errors)
  }
}