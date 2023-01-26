import React, { useContext, useEffect } from 'react';
import { AnalyticsContext } from './Dashboard';

const Analysis = ({ anything }) => {
	const { lyticState, lyticsReducer } = useContext(AnalyticsContext);
	useEffect(() => {
		console.log(lyticState);
	}, [lyticState, anything]);
	return (
		<div>
			<h1>a{anything.info}</h1>
		</div>
	);
};

export default Analysis;
