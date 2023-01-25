import React from 'react';

const Song = ({ song_data, index }) => {
	function duration(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}
	const get_song = () => {
		console.log(song_data.track);
	};
	return (
		<div className="songBox" onClick={get_song}>
			<div className="column">{index + 1}</div>
			<img
				className="column"
				src={song_data.track.album.images[0].url}
				alt=""
			/>
			<div className="column">{song_data.track.name}</div>
			<div className="column">{song_data.track.artists[0].name} </div>
			<div className="column">{song_data.track.album.name}</div>
			<div className="column">{duration(song_data.track.duration_ms)}</div>
		</div>
	);
};

export default Song;
