import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Playlist from './Playlist';
import Playlists from './Playlists';
import useAuth from './useAuth';
import User from './User';

const spotifyApi = new SpotifyWebApi({
	clientId: '3c1bdeec86614e4c93acbdcf70e7d25b',
});
const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	const [user_details, setUser] = useState();
	const [show_codes, setCodeVisibility] = useState(false);
	const [user_playlists, setPlaylists] = useState(null);

	useEffect(() => {
		if (!accessToken) return;

		spotifyApi.setAccessToken(accessToken);
		spotifyApi.getMe().then((data) => {
			console.log(data);
			setUser(data.body);
		});
		spotifyApi.getUserPlaylists({ limit: 5 }).then((data) => {
			console.log(data);
			setPlaylists(data.body.items);
		});
	}, [accessToken]);

	return (
		<div className="dashboard">
			<button onClick={() => setCodeVisibility(!show_codes)}>Codes</button>
			{user_details ? (
				<>
					<User userDetails={user_details} />{' '}
					{show_codes ? <div className="access_codes">{accessToken}</div> : ''}
				</>
			) : (
				''
			)}
			{user_playlists ? (
				<Playlists playListArray={user_playlists} accessToken={accessToken} />
			) : (
				''
			)}
			{show_codes ? <div className="access_codes">{code}</div> : ''}
			<br />
		</div>
	);
};

export default Dashboard;
