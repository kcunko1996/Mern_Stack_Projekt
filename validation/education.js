const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (data) => {
  let errors = {}

 
  data.school = !isEmpty(data.school) ? data.school : ''
  data.degree = !isEmpty(data.degree) ? data.degree : ''
  data.from = !isEmpty(data.from) ? data.from : ''
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''


  if(Validator.isEmpty(data.school)){
    errors.school = 'Naziv je obavezno'
  }
  
  if(Validator.isEmpty(data.degree)){
    errors.degree = 'Tvrtka nije validan'
  }
  if(Validator.isEmpty(data.from)){
    errors.from = 'Pocetak  je obavezna'
  }
  if(Validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = 'Tvrtka nije validan'
  }

console.log(errors)
  return {
    errors,
    isValid: isEmpty(errors)
  }
}