import axios from 'axios'
import { headers } from '../../../services/apiBaseUrl'
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