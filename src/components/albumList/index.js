import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAlbumList } from '../../store/actions/albumList.action';
import { Col, Row, ListGroup } from 'react-bootstrap'

export const AlbumList = () => {
	const dispatch = useDispatch()
	const userDetails = useSelector(state => state?.user?.userDetails)
	const getUserAlbum = useSelector(state => state?.userAlbum)
	const [albumFullList, setAlbumFullList] = useState([])
	const [page, setPage] = useState(1)

	const infiniteScroll = () => {
		let winH = (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
		if(winH){
			let newPage = page;
			newPage++;
			setPage(newPage);
			dispatch(fetchUserAlbumList({id: userDetails?.id, page: newPage}))
		}
	}

	useEffect(() => {
		dispatch(fetchUserAlbumList({id: userDetails?.id, page}))
	}, [])

	useEffect(() => {
		setAlbumFullList([...albumFullList, ...getUserAlbum?.albumFullList])
	}, [getUserAlbum?.albumFullList])
	
	useEffect(() => {
		document.addEventListener('scroll', infiniteScroll);
		return () => {
			document.removeEventListener('scroll', infiniteScroll)
		}
	}, [])

	return (
		<Row>
			<Col lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
				<h2>list</h2>
				<ListGroup as={'ul'}>
					{albumFullList?.map((list, idx) =>
						<ListGroup.Item as={'li'} action key={idx}>
								<figure className="h-50">
									<Link to={`/list/album-details?id=${list?.id}`}>
										<img src={list?.photo?.thumb} alt={list?.title} style={{minHeight: 150, minWidth: 150}} className="float-left"/>
									</Link>
								</figure>
								<p>{list?.title}</p>
						</ListGroup.Item>
					)}
				</ListGroup>
			</Col>
		</Row>
	)
}

export default AlbumList