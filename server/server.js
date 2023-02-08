const express = require('express');
const cors = require('cors');
const s = require('/secret.json');
const Secret = JSON.parse(s);
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = 8000;

app.use(cors()); // to handle cross origin requests
app.use(express.json()); // to parse json

const credentials = {
	clientId: '3c1bdeec86614e4c93acbdcf70e7d25b',
	clientSecret: Secret.clientSecret,
	redirectUri: 'http://localhost:3000/',
};

app.get('/', (req, res) => {
	console.log('Hello World!');
});

//TODO fix weird extra error
// a login route requests the code from the client side and then
// asks for accesstoken from the api
app.post('/login', (req, res) => {
	//  setup
	let spotifyApi = new SpotifyWebApi(credentials);

	//  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
	const code = req.body.code;

	// Retrieve an access token
	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			// Returning the User's AccessToken in the json formate
			res.json({
				accessToken: data.body.access_token,
			});
		})
		.catch((err) => {
			res.sendStatus(400);
		});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//node server.js to host
