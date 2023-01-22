import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Playlist from './Playlist';

const spotifyApi = new SpotifyWebApi({
	clientId: '3c1bdeec86614e4c93acbdcf70e7d25b',
});

const Playlists = ({ playListArray, accessToken }) => {
	const [playListLibrary, setPlaylistLibrary] = useState([]);
	const [currentTracks, setCurrentTracks] = useState(null);
	const [selectedPlaylist, selectPlaylist] = useState(null);
	useEffect(() => {
		spotifyApi.setAccessToken(accessToken);
		if (!selectedPlaylist) return;
		console.log(selectedPlaylist.name);
		let play_track_uri = selectedPlaylist.uri.split(':')[2];
		spotifyApi.getPlaylistTracks(play_track_uri).then((playlist_tracks) => {
			console.log(playlist_tracks.body.items);
			setCurrentTracks(playlist_tracks.body.items);
		});
	}, [playListArray, selectedPlaylist, accessToken]);

	return (
		<div className="playListModule">
			<div className="playlists-grid">
				{playListArray.map((e) => {
					return (
						<Playlist
							spotify_playlist={e}
							key={e.uri}
							select={() => selectPlaylist(e)}
						/>
					);
				})}
			</div>
			<div className="activePlaylist">
				{currentTracks ? (
					<div>
						<h2>{selectedPlaylist.name}</h2>
						{currentTracks.map((e) => {
							return (
								<div>
									{e.track.name} - {e.track.artists[0].name}
								</div>
							);
						})}
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default Playlists;
