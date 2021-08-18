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
const albumFullListData = (data) => ({
	type: actionTypes.ALBUM_FULL_LIST,
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

export const fetchUserAlbumList = (data) => {
	const params = {
		userId: data?.id,
		_page: data?.page,
		_limit: 10
	}
	return (dispatch) => {
		dispatch(albumListRequest(true))
		return CreateAxiosInstantAPI().get(`/albums`,{ params })
			.then(res => {
				dispatch(albumListData(res.data))
				dispatch(fetchAlbumPhotos(data?.id))
			})
			.catch(e => {
				console.log(e)
				dispatch(albumListError(e))
			})
	}
}

export const fetchAlbumPhotos = (id) => {
	return (dispatch) => {
		dispatch(albumListRequest(true))
		return CreateAxiosInstantAPI().get(`album/${id}/photos`)
			.then(res => {
				dispatch(albumPhotos(res.data))
				dispatch(getPhoto())
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

const getPhoto = () => {
	return (dispatch, getState) => {
		const {albumPhotos, albumList} = getState()?.userAlbum
		const mergedData = albumList.map((album, i) => {
			if(album?.id === albumPhotos[i]?.id) {
				return {
					...album,
					photo: {
						thumb: albumPhotos[i]?.thumbnailUrl,
						url: albumPhotos[i]?.url
					}
				}
			}
		})
		dispatch(albumFullListData(mergedData))
	}
}