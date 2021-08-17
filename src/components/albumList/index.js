import React, { useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty'
import {useHistory} from 'react-router-dom'
import { useUserIdentity } from '../../hooks/useUserIdentity';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumListErrorMessage, fetchUserAlbumList } from '../../store/actions/albumList.action';
import { Col, Row, ListGroup } from 'react-bootstrap'

export const AlbumList = () => {
	const dispatch = useDispatch()
	const getUserDetails = useSelector(state => state?.user?.userDetails)
	const getUserAlbum = useSelector(state => state?.userAlbum)
	const { albumList, albumPhotos } = getUserAlbum

	const [user, setUser] = useState({})

	useEffect(() => {
		console.log(getUserDetails)
		setUser(getUserDetails)
	},[getUserDetails?.username])

	useEffect(() => {
		if(!_isEmpty(user)) {
			dispatch(fetchUserAlbumList(user?.id))
		}
	}, [user])

	const getPhoto = (id) => {
		const filterPhoto = albumPhotos.filter(photo => photo.id === id)
		console.log(filterPhoto[0])
		return filterPhoto[0]
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<p>User: {user?.username}</p>
				<h2>Alblum list</h2>
				<ListGroup defaultActiveKey="#link1">
					{albumList?.map(({id, title}) =>
						<ListGroup.Item action href={`#link${id}`}>
							<img src={getPhoto(id)?.thumbnailUrl} alt={''} /> <span>{title}</span>
						</ListGroup.Item>
					)}
				</ListGroup>
			</Col>
		</Row>
	)
}

export default AlbumList