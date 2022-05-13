import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
	const [userCredentials, setUserCredentials] = useState({
		email: '',
		password: '',
	});

	const { email, password } = userCredentials;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await auth.signInWithEmailAndPassword(email, password);
			console.log(user, 'lpo');
			setUserCredentials({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { value, name } = e.target;

		setUserCredentials({
			...userCredentials,
			[name]: value,
		});
	};

	return (
		<div className="sign-in">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="email"
					value={email}
					handleChange={handleChange}
					label="email"
					required
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					handleChange={handleChange}
					label="password"
					required
				/>
				<div className="buttons">
					<CustomButton type="submit"> Sign in </CustomButton>
					<CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
						{' '}
						Sign in with Google{' '}
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
