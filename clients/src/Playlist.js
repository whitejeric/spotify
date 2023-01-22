import React, { useEffect } from 'react';

const Playlist = ({ spotify_playlist, select }) => {
	useEffect(() => {
		// console.log(spotify_playlist.name, spotify_playlist);
	});
	return (
		<figure>
			<img
				onClick={select}
				src={spotify_playlist.images[0].url}
				className="playlistCoverPhoto"
				alt={spotify_playlist.name}
			/>
			<figcaption>{spotify_playlist.name}</figcaption>
		</figure>
	);
};

export default Playlist;
