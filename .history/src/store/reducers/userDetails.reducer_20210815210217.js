import { actionTypes } from '../types'
  
  const initialState = {
    userDetailsRequest: false,
    userDetails: {},
    userDetailsError: {},
  }
  
  const UserDetailsReducers = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.USER_DETAILS_REQUEST:
        return {
          ...state,
          userDetailsRequest: action.payload,
        }

      default:
        return state
    }
  }
  
  export default UserDetailsReducers
  