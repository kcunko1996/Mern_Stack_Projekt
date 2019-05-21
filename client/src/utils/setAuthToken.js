import axios from 'axios'

export const setAuthToken = token => {
  //Postavljamo token u auth header
  if(token){
    axios.defaults.headers.common['Authorization'] = token
  } else {
    //Ako token ne postoji brisemo ga iz headera
      delete axios.defaults.headers.common['Authorization']
  }
}