import { actionTypes } from '../types'

const initialState = {
	albumListRequest: false,
	albumList: [],
	albumPhotos: [],
	albumListError: {},
}

const AlbumListReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ALBUM_LIST_REQUEST:
			return {
				...state,
				albumListRequest: action.payload,
			}
		case actionTypes.ALBUM_LIST:
			return {
				...state,
				albumList: action.payload,
			}
		case actionTypes.ALBUM_PHOTOS:
			return {
				...state,
				albumPhotos: action.payload,
			}
		case actionTypes.ALBUM_LIST_ERROR:
			return {
				...state,
				albumListError: action.payload,
			}
		default:
			return state
	}
}

export default AlbumListReducers
