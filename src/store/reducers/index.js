import { combineReducers } from 'redux'
import UserDetailsReducers from './userDetails.reducer'
import AlbumListReducers from './albumList.reducer'

const rootReducer = combineReducers({
    user: UserDetailsReducers,
    userAlbum: AlbumListReducers,
})

export default rootReducer