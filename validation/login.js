const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (data) => {
  let error = {}

 
  data.email = !isEmpty(data.email) ? data.email : ''
  data.passwor = !isEmpty(data.passwor) ? data.passwor : ''


  if(!Validator.isLength(data.passwor,{min: 6, max:30})){
    error.passwor= 'passwor nije izmedu 6 i 30 znakova'
  }



  if(Validator.isEmpty(data.email)){
    error.email = 'email je obavezno'
  }
  
  if(!Validator.isEmail(data.email)){
    error.email = 'Email nije validan'
  }
  if(isEmpty(data.passwor)){
    error.passwor = 'Sifra je obavezna'
  }


  return {
    error,
    isValid: isEmpty(error)
  }
}