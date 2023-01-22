import React from 'react';

const User = ({ userDetails }) => {
	return (
		<div id="user_box">
			<div className="grid">
				<div>
					<h2>{userDetails.display_name}</h2>
					<p>{userDetails.email}</p>
					<p>{userDetails.country}</p>
					<p>
						<a href={userDetails.external_urls.spotify}>User spotify</a>
					</p>
					<p>API: {userDetails.href}</p>
					<p>ID: {userDetails.id}</p>
					<p>Account: {userDetails.product}</p>
					<p>URI: {userDetails.uri}</p>
				</div>
				<img id="user_image" alt="" src={userDetails.images[0].url} />
			</div>
		</div>
	);
};

export default User;
