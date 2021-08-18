import React, { useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty'
import {useHistory, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumListErrorMessage, fetchUserAlbumList } from '../../store/actions/albumList.action';
import { Col, Row, ListGroup } from 'react-bootstrap'

export const AlbumList = () => {
	let history = useHistory()
	const dispatch = useDispatch()
	const getUserDetails = useSelector(state => state?.user?.userDetails)
	const getUserAlbum = useSelector(state => state?.userAlbum)
	const [user, setUser] = useState({})
	const [albumFullList, setAlbumFullList] = useState([])
	const [page, setPage] = useState(1)

	const infiniteScroll = () => {
		let winH = (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
		console.log(winH)
		if(winH){
			let newPage = page;
			newPage++;
			setPage(newPage);
			dispatch(fetchUserAlbumList({id: user?.id, page: newPage}))
		}
	}

	useEffect(() => {
		setUser(getUserDetails)
	},[getUserDetails?.username])

	useEffect(() => {
		if(!_isEmpty(user)) {
			console.log("user", user)
			dispatch(fetchUserAlbumList({id: user?.id, page}))
		}
	}, [user])

	useEffect(() => {
		window.addEventListener('scroll', () => {
			infiniteScroll()
		});
		setAlbumFullList([...albumFullList, ...getUserAlbum?.albumFullList])
	}, [getUserAlbum?.albumFullList])

	// useEffect(() => {
	// 	window.addEventListener('scroll', infiniteScroll);
	// 	setAlbumFullList([...albumFullList, ...getUserAlbum?.albumFullList])
	// }, [])

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<p>User: {user?.username}</p>
				<h2>list</h2>
				<ListGroup defaultActiveKey="/list/album-details/">
					{albumFullList?.map((list) =>
						<ListGroup.Item action key={list?.id}>
							<Link to={`/list/album-details?id=${list?.id}`}>
								<figure className="h-50">
									<img src={list?.photo?.thumb} alt={list?.title} style={{minHeight: 150, minWidth: 150}}/>
									<span>{list?.title}</span>
								</figure>
						</Link>
						</ListGroup.Item>
					)}
				</ListGroup>
			</Col>
		</Row>
	)
}

export default AlbumList