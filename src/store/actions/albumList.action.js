import { CreateAxiosInstantAPI } from '../../services/axiosInstant';
import { actionTypes } from '../types'

const albumListRequest = (boo) => ({
	type: actionTypes.ALBUM_LIST_REQUEST,
	payload: boo,
})
const albumListData = (data) => ({
	type: actionTypes.ALBUM_LIST,
	payload: data,
})
const albumPhotos = (data) => ({
	type: actionTypes.ALBUM_PHOTOS,
	payload: data
})

const albumListError = (error) => ({
	type: actionTypes.ALBUM_LIST_ERROR,
	payload: error,
})

export const fetchUserAlbumList = (id) => {
	const params = {
		userId: id
	}
	return (dispatch) => {
		dispatch(albumListRequest(true))
		return CreateAxiosInstantAPI().get(`/albums`,{ params })
			.then(res => {
				dispatch(albumListData(res.data))
				dispatch(fetchAlbumPhotos())
			})
			.catch(e => {
				console.log(e)
				dispatch(albumListError(e))
			})
	}
}

export const fetchAlbumPhotos = () => {
	return (dispatch) => {
		dispatch(albumListRequest(true))
		return CreateAxiosInstantAPI().get(`/photos`)
			.then(res => {
				dispatch(albumPhotos(res.data))
			})
			.catch(e => {
				console.log(e)
				dispatch(albumListError(e))
			})
	}
}

export const getAlbumListErrorMessage = () => {
	return (dispatch, getState) => {
		console.log(getState())
		return getState()
	}
}