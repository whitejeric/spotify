import React, { useEffect, useReducer, useRef, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Analysis from './Analysis';
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
	const [show_user, setUserVisibility] = useState(false);
	const [user_playlists, setPlaylists] = useState(null);
	const didLoad = useRef(false);
	const updateAnalysis = useRef(null);

	//TODO TURN THIS INTO A FUCKING MODULE JESUS CHRIST FUCKING CHRIST
	function lyticsReducer(state, action) {
		let item_count = 0;
		console.log('lyticsReducer in Dashboard.js: ', action.payload);
		switch (action.type) {
			case 'playlist':
				state.target = action.payload.id;
				//the playlist we will be examining
				spotifyApi.getPlaylistTracks(state.target).then((target_tracks) => {
					let songs = state.target;
					let song_ids = []; //an array of ids of individual songs ids
					target_tracks.body.items.forEach((song) => {
						song_ids.push(song.track.id);
					});
					item_count = song_ids.length;
					console.log(
						'songs is an array of ids',
						song_ids,
						' length',
						item_count
					);
					//features is a spotify api specific term instead of properties
					let PLAYLISTFEATURES = null;
					spotifyApi
						.getAudioFeaturesForTracks(song_ids)
						.then((e) => {
							PLAYLISTFEATURES = e.body.audio_features;
						})
						.then(() => {
							console.log(PLAYLISTFEATURES, 'as');
							state.info = JSON.stringify(PLAYLISTFEATURES[0]);
						});
				});

				return state;

			case 'song':
				state.target = action.payload;
				state.info = action.payload;
				return state;
			default:
				return 'NEGATIVE';
		}
	}

	const [lyticState, dispatch] = useReducer(lyticsReducer, {
		target: null,
		info: null,
	});

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

	function helper() {
		console.log('helper in Dashboard.js :', lyticState);
		lyticsReducer(lyticState, { type: 'piss', payload: 'piss' });
		updateAnalysis.current = lyticState;
	}

	return (
		<AnalyticsContext.Provider value={{ lyticState, dispatch }}>
			<button onClick={() => helper()}>piss</button>
			<div className="access_codes" style={{ display: 'none' }}>
				Code: {code}
			</div>
			<div className="dashboard">
				<div>
					<button onClick={() => setUserVisibility(!show_user)}>User</button>
				</div>
				<Analysis key={lyticState.info} anything={lyticState} />
				{user_details && show_user && <User userDetails={user_details} />}
				{user_playlists && (
					<Playlists playListArray={user_playlists} accessToken={accessToken} />
				)}
			</div>
		</AnalyticsContext.Provider>
	);
};

export default Dashboard;
