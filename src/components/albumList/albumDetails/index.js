import React from 'react';
import _isEmpty from 'lodash/isEmpty'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Button, Card, CardImg, Col, Row } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'

export const AlbumDetails = () => {
	let history = useHistory()
	let queryParam = new URLSearchParams(useLocation().search);
	const id = parseInt(queryParam.get('id'))
	const getAlbumList = useSelector(state => state?.userAlbum)
	const albumData = getAlbumList?.albumFullList.filter(album =>  album?.id === id)[0]

	if(id === undefined){
		history.push('/list')
	}

	return (
		<Row>
			<Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
				<h2>Album details</h2>
				{_isEmpty(albumData)
					? <h6>No album details...</h6>
					: <Card>
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