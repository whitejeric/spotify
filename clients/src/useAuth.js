import axios from 'axios';
import { useEffect, useState } from 'react';

//useEffect to listen for the code being dropped to dom, tosses to our server
//to get our access token
export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState();

	useEffect(() => {
		axios
			.post('http://localhost:8000/login', { code })
			.then((response) => {
				// If success then cut the code string from the URL and execute the other thing
				window.history.pushState({}, null, '/');
				setAccessToken(response.data.accessToken);
			})
			.catch((err) => {
				console.log(err);
				//   If fail redirect to home page - Login page
				// window.location = '/';
			});
	}, [code]);
	//[code]:= if code changes post component mount the function is called again

	return accessToken;
}
