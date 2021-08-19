import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'
import { BsCollection } from 'react-icons/bs'
import { Col, Button } from 'react-bootstrap';
import { logOut } from '../../store/actions/userDetails.action';

export const Header = () => {
	const dispatch = useDispatch()
	const userDetails = useSelector(state => state?.user?.userDetails)

	const handleLogOut = (e) => {
		e.preventDefault()
		dispatch(logOut())
	}

	return (
		<>
		<header className="p-2">
			<h2 className="d-inline"><BsCollection /> {userDetails?.name} Album List...</h2>
			{!_isEmpty(userDetails) &&
					<Button
						onClick={handleLogOut}
						className="float-end btn-light btn-outline-dark"
					>
						Logout
					</Button>
			}
		</header>
		<Col>
			<span className="p-2 d-inline-block float-right">User: {userDetails?.username}</span>
		</Col>
	</>
	)
}

export default Header