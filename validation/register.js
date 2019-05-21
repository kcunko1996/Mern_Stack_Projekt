const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (data) => {
  let error = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.passwor = !isEmpty(data.passwor) ? data.passwor : ''
  data.passwor2 = !isEmpty(data.passwor2) ? data.passwor2 : ''

  if(!Validator.isLength(data.name,{min: 2, max:30})){
    error.name= 'Rijec nije izmedu 2 i 30 znakova'
  }
  if(!Validator.isLength(data.passwor,{min: 6, max:30})){
    error.passwor= 'password nije izmedu 6 i 30 znakova'
  }

  if(Validator.isEmpty(data.name)){
    error.name = 'Ime je obavezno'
  }


  
  if(!Validator.isEmail(data.email)){
    error.email = 'Email nije validan'
  }
  if(isEmpty(data.passwor)){
    error.passwor = 'Sifra je obavezna'
  }
  if(isEmpty(data.passwor2)){
    error.passwor2 = 'Potvrditi Sifru je obavezno'
  }
  if(!Validator.equals(data.passwor, data.passwor2)){
    error.passwor2 = 'Sifre se ne podudaraju'
  }

  return {
    error,
    isValid: isEmpty(error)
  }
}