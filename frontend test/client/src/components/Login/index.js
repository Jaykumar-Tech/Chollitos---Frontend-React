import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Auth from '../../utils/auth';
import DividerLine from '../DividerLine';
import { Link } from 'react-router-dom';
import TodoList from '../../pages/TodoList';
import { loginUser } from '../../utils/API';
import axios from 'axios';

const Login = () => {
	const [formState, setFormState] = useState({ name: '', password: '' });
	const [errorMsg, setErrorMsg] = useState(null);

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const response = await loginUser(formState);

			if (!response.ok) {
				setErrorMsg('Incorrect Name or Password.');
				throw new Error('Incorrect Name or Password.');
			}

			const { token } = await response.json();
			Auth.login(token);
			location.replace('/todos');
		} catch (err) {
			console.error(err);
		}

		// setFormState({ name: '', password: '' });
	};

	// Update the form's input state
	const handleChange = event => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleLogin = () => {
		const firebaseConfig = {
			apiKey: "AIzaSyC2fD6TDBdbhZYg5097RAkMYs-7fJIPf_g",
			authDomain: "chollo-es-396117.firebaseapp.com",
			projectId: "chollo-es-396117",
			storageBucket: "chollo-es-396117.appspot.com",
			messagingSenderId: "416034001184",
			appId: "1:416034001184:web:73027a3783bf8fd7e60745",
			measurementId: "G-B9XRQE5YX9"
		};

		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		const provider = new GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		provider.setCustomParameters({
			'login_hint': 'gemma@gmail.com'
		  });

		// Initialize Firebase Authentication and get a reference to the service
		const auth = getAuth(app);
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				console.log(result);
				// The signed-in user info.
				const user = result.user;
				result.user.getIdToken(true).then(function(idToken){
					axios.post("http://localhost:4000/api/user/google",{
						idToken: idToken,
						email: user.email
					})
					.then(response=>{
						console.log(response) ;
					})
					.catch(err=>{
						console.log(err)
					})
				}).catch(function(err){
					console.log(err);
				})
				
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			}).catch((error) => {
				// Handle Errors here.
				console.log(error)
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}

	const handleFacebook = () => {
		const firebaseConfig = {
			apiKey: "AIzaSyDr5-XwdiyJqFmhikGTBcFAGnnO-7XcZrM",
			authDomain: "facebook-chollo.firebaseapp.com",
			projectId: "facebook-chollo",
			storageBucket: "facebook-chollo.appspot.com",
			messagingSenderId: "478583572666",
			appId: "1:478583572666:web:db3cdeffaf507d05a0da83",
			measurementId: "G-8XLSENRK41"
		  };

		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		const provider = new GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		provider.setCustomParameters({
			'login_hint': 'daltonbreka@gmail.com'
		  });

		// Initialize Firebase Authentication and get a reference to the service
		const auth = getAuth(app);
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				console.log(result)
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			}).catch((error) => {
				// Handle Errors here.
				console.log(error)
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}
	return (
		<>
			{Auth.loggedIn() ? (
				<TodoList />
			) : (
				<section>
					<Heading as='h3' my='25px'>
						Login here!
						<button onClick={handleLogin}>
							GO TO GOOGLE Login
						</button>
						<hr></hr>
						<button onClick={handleFacebook}>
							GO TO FACEBOOK LOGIN
						</button>
					</Heading>
					<form onSubmit={handleSubmit}>
						<FormControl isRequired>
							<FormLabel htmlFor='name'>Your Name:</FormLabel>
							<Input
								size='lg'
								name='name'
								type='text'
								id='name'
								value={formState.name}
								onChange={handleChange}
							/>
							<FormHelperText>First Name, Nickname, whatever you prefer!</FormHelperText>

							<DividerLine />

							<FormLabel htmlFor='loginPassword'>Password:</FormLabel>
							<Input
								size='lg'
								name='password'
								type='password'
								id='loginPassword'
								value={formState.password}
								onChange={handleChange}
							/>

							<div className='error-wrap'>
								<Button marginTop={5} type='submit' colorScheme='teal' size='lg'>
									Login
								</Button>
								{errorMsg && <span className='error-msg'>{errorMsg}</span>}
							</div>
						</FormControl>
					</form>

					<DividerLine />

					<div>
						<p>Haven't joined yet?</p>
						<Link to='/signup'>
							<Button marginTop={5} colorScheme='purple' size='lg'>
								Click here!
							</Button>
						</Link>
					</div>
				</section>
			)}
		</>
	);
};

export default Login;
