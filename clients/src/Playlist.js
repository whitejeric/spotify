import React from 'react';

const Playlist = ({ spotify_playlist, select, is_selected }) => {
	return (
		<figure
			onClick={select}
			style={is_selected ? { backgroundColor: 'aqua' } : {}}
		>
			<img
				src={spotify_playlist.images[0].url}
				className="playlistCoverPhoto"
				alt={spotify_playlist.name}
			/>
			<figcaption>{spotify_playlist.name}</figcaption>
		</figure>
	);
};

export default Playlist;
