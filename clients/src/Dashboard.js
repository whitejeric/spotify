import React, { useEffect, useReducer, useRef, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Playlists from './Playlists';
import useAuth from './useAuth';
import User from './User';

const spotifyApi = new SpotifyWebApi({
	clientId: '3c1bdeec86614e4c93acbdcf70e7d25b',
});

export const AnalyticsContext = React.createContext();

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);

	const [user_details, setUser] = useState();
	const [show_codes, setCodeVisibility] = useState(false);
	const [show_user, setUserVisibility] = useState(false);
	const [user_playlists, setPlaylists] = useState(null);
	const didLoad = useRef(false);

	function lyticsReducer(state, action) {
		console.log(
			'lyticsReducer in Dashboard.js: ',
			JSON.stringify(action.payload.name)
		);
		switch (action.type) {
			case 'playlist':
				// spotifyApi.getAudioFeaturesForTracks();
				return { target: action.payload };
			case 'song':
				return { target: action.payload };
			default:
				return { target: action.payload };
		}
	}
	const lyticState = { target: null, analytics_call: null };
	const [state, dispatch] = useReducer(lyticsReducer, lyticState);

	useEffect(() => {
		if (!accessToken) return;
		if (!didLoad.current) {
			spotifyApi.setAccessToken(accessToken);
			spotifyApi.getMe().then((data) => {
				setUser(data.body);
			});
			spotifyApi.getUserPlaylists({ limit: 5 }).then((data) => {
				setPlaylists(data.body.items);
			});
		}
		didLoad.current = true;
	}, [accessToken]);

	return (
		<AnalyticsContext.Provider value={{ state, dispatch }}>
			<div className="dashboard">
				<div>
					<button onClick={() => setCodeVisibility(!show_codes)}>Codes</button>
					<button onClick={() => setUserVisibility(!show_user)}>User</button>
				</div>
				{user_details && show_user ? (
					<>
						<User userDetails={user_details} />{' '}
						{show_codes ? (
							<div className="access_codes">Token: {accessToken}</div>
						) : (
							''
						)}
					</>
				) : (
					''
				)}
				{show_codes ? <div className="access_codes">Code: {code}</div> : ''}
				{user_playlists ? (
					<Playlists playListArray={user_playlists} accessToken={accessToken} />
				) : (
					''
				)}

				<br />
			</div>
		</AnalyticsContext.Provider>
	);
};

export default Dashboard;
