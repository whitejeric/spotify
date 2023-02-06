const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'https://a0d5de0f.spotify-a2e.pages.dev/';
const clientId = '3c1bdeec86614e4c93acbdcf70e7d25b';

const scopes = [
	'streaming',
	'user-read-email',
	'user-read-private',
	'playlist-read-private',
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}`;
