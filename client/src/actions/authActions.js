import {GET_ERROR,SET_CURRENT_USER} from './types'
import axios from 'axios'
import {setAuthToken} from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'


export const userRegister = (data, history) => dispatch =>  {
  axios.post('/api/users/register', data)
       .then(() => history.push('/login'))
       .catch(err => 
        dispatch({
          type: GET_ERROR,
          payload: err.response.data
        })
        )
}

export const userlogin = (data) => dispatch => {
  axios.post('/api/users/login', data)
       .then((res) => {
          const { token } = res.data
          console.log(token)
          //Spremanje tokena u loackStorage
          localStorage.setItem('jwtToken', token)
          //Postavljanje Tokena u header, koristenjem posebne funkcije 
          setAuthToken(token);
          //Pretvaranje tokena da dohatimo korisnikove podatke 
          const decode = jwt_decode(token)
          //Postavljamo trenutacnog korinska 
          dispatch(setCurrentUser(decode))
       })
       .catch(err => {
          // Ako ima gresaka poslat ih store
    
         dispatch({
           type: GET_ERROR,
           payload: err.response.data
         })
       })
}

//Postavljanje trenutacnog korisnika 
export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode
  }
}

export const logoutuser = (history) => dispatch => {
  localStorage.removeItem('jwtToken')

  setAuthToken(false)
  dispatch(setCurrentUser({}))
  history.push('/login')
}