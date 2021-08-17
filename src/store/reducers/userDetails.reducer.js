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
        case actionTypes.USER_DETAILS:
            return {
              ...state,
              userDetails: action.payload,
            }
            case actionTypes.USER_DETAILS_ERROR:
                return {
                  ...state,
                  userDetailsError: action.payload,
                }
      default:
        return state
    }
  }
  
  export default UserDetailsReducers
  