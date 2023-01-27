import React, { useEffect, useRef } from 'react';

const Analysis = ({ content }) => {
	const refined_content = useRef(null);

	function parse(data) {
		let averages = {};
		let timeline = {};
		if (!data) return;
		let total_num_songs = data.length;
		data.forEach((song, index) => {
			let song_metrics = Object.entries(song);
			song_metrics.map(([key, value]) => {
				if (!isNaN(value)) {
					averages[key]
						? (averages[key] += value / total_num_songs)
						: (averages[key] = value / total_num_songs);
					timeline[key] ? timeline[key].push(value) : (timeline[key] = [value]);
				}
				return null;
			});
		});
		refined_content.current = { averages, timeline };
		console.log('Parsed from Analysis/parse: ', { averages }, { timeline });
	}
	useEffect(() => {
		// console.log('useEffect in Analyis:', content);
		if (content.length) {
			//has more than one element
			parse(content);
		} else {
			parse([content]);
		}
	}, [content]);
	return (
		<div className="analysisModule">
			<p>{JSON.stringify(refined_content)}</p>
		</div>
	);
};

export default Analysis;
