import axios from 'axios'
import {GET_PROFILE,PROFILE_LOADING,GET_ERROR, CLEAR_CURRENT_PROFILE} from './types'

export const getCurrentProfile = () => dispatch => {

  //Dohvat trenutacnih profila
    dispatch(setProfileLoading());
    axios
      .get('/api/profile')
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: {}
        })
      )
  }


export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}


export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}