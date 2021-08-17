import { combineReducers } from 'redux'
import UserDetailsReducers from './userDetails.reducer'

const rootReducer = combineReducers({
    User: UserDetailsReducers 
})

export default rootReducer