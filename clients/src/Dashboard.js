import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from './useAuth';

const spotifyApi = new SpotifyWebApi({
	clientId: '3c1bdeec86614e4c93acbdcf70e7d25b',
});
const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	useEffect(() => {
		if (!accessToken) return;

		spotifyApi.setAccessToken(accessToken);
		spotifyApi.getMe().then((data) => {
			console.log(data);
		});
	}, [accessToken]);
	return (
		<div id="code_key" key={code}>
			<div>{code}</div>
			<br />
			<div>{accessToken}</div>
		</div>
	);
};

export default Dashboard;
