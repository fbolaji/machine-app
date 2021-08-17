import React from 'react'
import { Col } from 'react-bootstrap'
import { useUserIdentity } from '../../hooks/useUserIdentity'

export const HomePage = () => {
	const userIdentity = useUserIdentity()

	return (
		<>
			<Col lg={{ span: 12 }} data-testid="home-page" className="home-page">
				<p>{userIdentity?.email} Content will display here ..</p>
			</Col>
		</>
	)
}

export default HomePage