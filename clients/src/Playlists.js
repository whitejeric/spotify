import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Playlist from './Playlist';
import Song from './Song';

const spotifyApi = new SpotifyWebApi({
	clientId: '3c1bdeec86614e4c93acbdcf70e7d25b',
});

const Playlists = ({ playListArray, accessToken }) => {
	const [currentTracks, setCurrentTracks] = useState(null);
	const [selectedPlaylist, selectPlaylist] = useState(null);
	useEffect(() => {
		spotifyApi.setAccessToken(accessToken);
		if (!selectedPlaylist) return;
		console.log(selectedPlaylist.name);
		let play_track_uri = selectedPlaylist.uri.split(':')[2];
		spotifyApi.getPlaylistTracks(play_track_uri).then((playlist_tracks) => {
			setCurrentTracks(playlist_tracks.body.items);
		});
	}, [playListArray, selectedPlaylist, accessToken]);

	return (
		<div className="playListModule">
			<div className="playlists-grid">
				<h4>User Playlists</h4>
				{playListArray.map((e) => {
					return (
						<Playlist
							spotify_playlist={e}
							key={e.uri}
							select={() => selectPlaylist(e)}
							is_selected={selectedPlaylist === e}
						/>
					);
				})}
			</div>
			<div className="activePlaylist">
				{currentTracks ? (
					<div>
						<h4>{selectedPlaylist.name}</h4>
						<div className="songBox">
							<div>#</div>
							<div></div>
							<div>Song:</div>
							<div>Artist:</div>
							<div>Album:</div>
							<div>Duration:</div>
						</div>
						{currentTracks.map((e, i) => {
							return <Song song_data={e} key={e.uri} index={i} />;
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
