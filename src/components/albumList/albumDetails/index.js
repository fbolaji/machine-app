import React, { useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import { Link, useHistory, useParams, useLocation } from 'react-router-dom'
import { useUserIdentity } from '../../../hooks/useUserIdentity';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardImg, Col, Row } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'

export const AlbumDetails = () => {
	let history = useHistory()
	let queryParam = new URLSearchParams(useLocation().search);
	const id = parseInt(queryParam.get('id'))
	const getAlbumList = useSelector(state => state?.userAlbum)
	const albumData = getAlbumList?.albumFullList.filter(album =>  album.id === id)[0]

	if(!useUserIdentity()){
		history.push('/login')
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<h2>Album details</h2>
				{_isEmpty(albumData)
					? <h6>No album details...</h6>
					: <Card style={{ width: '100%'}}>
						<Card.Img variant="top" src={`${albumData?.photo?.url}`} />
						<Card.Body>
							<Card.Title className="text-secondary">
								{albumData?.title}
							</Card.Title>
						</Card.Body>
						<Card.Footer># {id}</Card.Footer>
					</Card>
				}
					<Button
						onClick={() => history.goBack()}
						type="button"
						variant="outline-secondary"
						className="mt-4"
					>
						<BsArrowLeft> back to album list</BsArrowLeft>
					</Button>
			</Col>
		</Row>
	)
}

export default AlbumDetails