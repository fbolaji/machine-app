import _isEmpty from 'lodash/isEmpty'
import { CreateAxiosInstantAPI } from '../../services/axiosInstant';
import { actionTypes } from '../types' 


const userDetailsRequest = (boo) => ({
    type: actionTypes.USER_DETAILS_REQUEST,
    payload: boo,
  })
  const userDetailsData = (data) => ({
    type: actionTypes.USER_DETAILS,
    payload: data,
  })
  
  const userDetailsError = (error) => ({
    type: actionTypes.USER_DETAILS_ERROR,
    payload: error,
  })

export const fetchUserDetails = (data) => {
  const params = {
    username: data.username,
    password: data.password
  }
  return (dispatch) => {
    dispatch(userDetailsRequest(true))
    dispatch(userDetailsData({}))
    return CreateAxiosInstantAPI().get(`/users`,{ params })
        .then(res => {
            const userData = res.data[0]
            if(_isEmpty(userData)) {
                dispatch(userDetailsError({message: "User can't be found!"}))
                return
            }
            dispatch(userDetailsData(userData))
            //window?.sessionStorage.setItem('user', JSON.stringify(userData))
        })
        .catch(e => {
          console.log(e)
          dispatch(userDetailsError(e))
        })
  }
}

export const getErrorMessage = () => {
    return (dispatch, getState) => {
        console.log(getState())
        return getState()

    }
}