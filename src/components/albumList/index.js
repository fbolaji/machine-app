import React, { useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAlbumList } from '../../store/actions/albumList.action';
import { Col, Row, ListGroup } from 'react-bootstrap'

export const AlbumList = () => {
	const dispatch = useDispatch()
	const getUserDetails = useSelector(state => state?.user?.userDetails)
	const getUserAlbum = useSelector(state => state?.userAlbum)
	const [user, setUser] = useState({})
	const [albumFullList, setAlbumFullList] = useState([])
	const [page, setPage] = useState(1)


	// TODO - behaviour is inconsistent
	const infiniteScroll = () => {
		let winH = (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)

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
		setAlbumFullList([...albumFullList, ...getUserAlbum?.albumFullList])
	}, [getUserAlbum?.albumFullList])

	// TODO - behaviour is inconsistent
	// useEffect(() => {
	// 	document.addEventListener('scroll', infiniteScroll);
	//
	// 	return () => {
	// 		document.removeEventListener('scroll', infiniteScroll)
	// 	}
	// }, [])

	return (
		<Row>
			<Col lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
				<p>User: {user?.username}</p>
				<h2>list</h2>
				<ListGroup as={'ul'}>
					{albumFullList?.map((list, idx) =>
						<ListGroup.Item as={'li'} action key={idx}>
							<figure className="h-50">
								<Link to={`/list/album-details?id=${list?.id}`}>
									<img src={list?.photo?.thumb} alt={list?.title} style={{minHeight: 150, minWidth: 150}}/>
									<span>{list?.title}</span>
								</Link>
							</figure>
						</ListGroup.Item>
					)}
				</ListGroup>
			</Col>
		</Row>
	)
}

export default AlbumList