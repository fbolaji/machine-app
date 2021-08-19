import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, Alert } from 'react-bootstrap';
import { fetchUserDetails } from '../../store/actions/userDetails.action';

export const LoginPage = () =>  {
	const history = useHistory()
	const dispatch = useDispatch()
	const userLoginDetails = useSelector(state => state?.user)
	const [isError, setIsError] = useState(null)
	const [submitted, setSubmitted] = useState(false)
	const [formData, setFormData]  = useState({
		username: '',
		password: '',
	});
	const { username, password} = formData;
	const userDetails = userLoginDetails?.userDetails
	const userDetailsError  = userLoginDetails?.userDetailsError

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData(  { ...formData,
			[name]: value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsError({})
		setSubmitted( true );
		const { username, password } = formData;

		if (username && password) {
			dispatch(fetchUserDetails(formData)).then(() => {
				if(userDetails?.username !== undefined) {
					history.push('/list')
				}
			})
		}
	}

	useEffect(() => {
		setIsError(userDetailsError)
	}, [userDetailsError])


		return (
			<Row>
				<Col lg={{ span: 6, offset: 3 }}  sm={{ span: 6, offset: 3 }}>
				<h2>Login</h2>
					{isError?.message && <Alert type="error" className="bg-danger text-light">{isError?.message}</Alert>}
				<Form name="loginForm" onSubmit={handleSubmit}>
					<div className={'form-group mb-3' + (submitted && !username ? ' has-error' : '')}>
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" name="username" value={username} onChange={handleChange} />
						{submitted && !username &&
						<div className="is-invalid text-danger mb-2">Username is required</div>
						}
					</div>
					<div className={'form-group mb-3' + (submitted && !password ? ' has-error' : '')}>
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
						{submitted && !password &&
						<div className="is-invalid text-danger mb-2">Password is required</div>
						}
					</div>
					<div className="form-group mt-2">
						<button className="btn btn-outline-dark">Login</button>
					</div>
				</Form>
			</Col>
			</Row>
		);
}

export default LoginPage
