const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (data) => {
  let errors = {}

 
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''

if(!Validator.isLength(data.handle, {min:2, max: 40})){
  errors.handle = 'Handle se mora sadrzavati barem 2 i najvise 40 znakova'
}

if(Validator.isEmpty(data.handle)){
  errors.handle = 'Profile handle je obavezan'
}

if(Validator.isEmpty(data.status)){
  errors.status = 'Status je obavezan'
}

if(Validator.isEmpty(data.skills)){
  errors.skills = 'Vjestine su  obavezan'
}

if(!isEmpty(data.website)){
  if(!Validator.isURL(data.website)){
    errors.website = 'Url nije validan'
  }
}

if(!isEmpty(data.youtube)){
  if(!Validator.isURL(data.youtube)){
    errors.youtube = 'Url nije validan'
  }
}

if(!isEmpty(data.facebook)){
  if(!Validator.isURL(data.facebook)){
    errors.facebook = 'Url nije validan'
  }
}

if(!isEmpty(data.twitter)){
  if(!Validator.isURL(data.twitter)){
    errors.twitter = 'Url nije validan'
  }
}

if(!isEmpty(data.linkedin)){
  if(!Validator.isURL(data.linkedin)){
    errors.linkedin = 'Url nije validan'
  }
}
if(!isEmpty(data.instagram)){
  if(!Validator.isURL(data.instagram)){
    errors.instagram = 'Url nije validan'
  }
}

  return {
    errors,
    isValid: isEmpty(errors)
  }
}