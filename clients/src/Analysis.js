import React, { useEffect, useRef } from 'react';
import SpotGraph from './SpotGraph';

const Analysis = ({ content, topic, details }) => {
	const refined_content = useRef({ averages: null, timeline: null });
	const hasBeenParsed = useRef(false);

	// name: 'Page A',
	// 	uv: 4000,
	// 	pv: 2400,
	// 	amt: 2400,
	// },
	function parse(data) {
		console.log({ topic });
		console.log({ details });
		let averages = {};
		let timeline = {};
		if (!data) return;
		let total_num_songs = data.length;
		let graph_data = Array(total_num_songs);
		data.forEach((song, index) => {
			let song_metrics = Object.entries(song);
			let graph_point = {};
			graph_point['name'] = String(details[index]);
			song_metrics.map(([key, value]) => {
				if (!isNaN(value)) {
					graph_point[key] = Math.abs(value);
					averages[key]
						? (averages[key] += value / total_num_songs)
						: (averages[key] = value / total_num_songs);
					timeline[key]
						? timeline[key].push(Math.abs(value))
						: (timeline[key] = [Math.abs(value)]);
				}
				return null;
			});
			graph_data[index] = graph_point;
		});

		refined_content.current = { averages, timeline, graph_data };
		hasBeenParsed.current = true;
		console.log(
			'Parsed from Analysis/parse: ',
			{ averages },
			{ timeline },
			{ graph_data }
		);
	}
	useEffect(() => {
		// console.log('useEffect in Analyis:', content);
		if (topic === 'No selection') return;
		if (content.length) {
			//has more than one element
			parse(content);
		} else {
			parse([content]);
		}
	}, [content]);
	return (
		<div id="analysis">
			<h2>{topic.name}</h2>
			<div className="analysisModule">
				<div>
					{hasBeenParsed.current && (
						<SpotGraph data={refined_content.current.graph_data} />
					)}
					{/* Timeline Graph: {JSON.stringify(refined_content.current.timeline)} */}
				</div>
				<div>
					{/* <button onClick={() => nextFeature()}></button> */}
					Averages Radial: {JSON.stringify(refined_content.current.averages)}
				</div>
			</div>
		</div>
	);
};

export default Analysis;
