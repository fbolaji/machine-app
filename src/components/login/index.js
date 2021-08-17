import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, Alert } from 'react-bootstrap';
import { fetchUserDetails } from '../../store/actions/userDetails.action';
import { useUserIdentity } from '../../hooks/useUserIdentity';

export const LoginPage = () =>  {
	const history = useHistory()
	const dispatch = useDispatch()
	const userLoginDetails = useSelector(state => state?.user)
	const [isError, setIsError] = useState(null)
	const [formData, setFormData]  = useState({
		username: '',
		password: '',
	});
	const [submitted, setSubmitted] = useState(false)
	const { username, password} = formData;
	const userDetailsError  = userLoginDetails?.userDetailsError

	if(useUserIdentity()) {
		history.push('/list')
	}

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData(  { ...formData,
			[name]: value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setSubmitted( true );
		const { username, password } = formData;

		if (username && password) {
			dispatch(fetchUserDetails(formData)).then(() => {
				history.push('/list')
			})
		}
	}

	useEffect(() => {
		console.log(userDetailsError)
		setIsError(userDetailsError)
	}, [userDetailsError])


		return (
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
				<h2>Login</h2>
					{isError?.message && <Alert type="error" className="bg-danger text-light">{isError?.message}</Alert>}
				<Form name="loginForm" onSubmit={handleSubmit}>
					<div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" name="username" value={username} onChange={handleChange} />
						{submitted && !username &&
						<div className="help-block">Username is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
						{submitted && !password &&
						<div className="help-block">Password is required</div>
						}
					</div>
					<div className="form-group mt-2">
						<button className="btn btn-primary">Login</button>
						{/*{loggingIn &&*/}
						{/*<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />*/}
						{/*}*/}
						{/*<Link to="/register" className="btn btn-link">Register</Link>*/}
					</div>
				</Form>
			</Col>
			</Row>
		);
}

export default LoginPage
