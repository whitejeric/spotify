import React, { useEffect, useRef, useState } from 'react';
import SpotGraph from './SpotGraph';
import SpotRadar from './SpotRadar';

const Analysis = ({ content, topic, details }) => {
	const refined_content = useRef({ averages: null, timeline: null });
	const hasBeenParsed = useRef(false);
	const [graph_type, setGraphType] = useState('default');

	const majorKeys = [
		'C',
		'Db',
		'D',
		'Eb',
		'E',
		'F',
		'Gb',
		'G',
		'Ab',
		'A',
		'Bb',
		'B',
	];
	const minorKeys = [
		'Cm',
		'C#m',
		'Dm',
		'Ebm',
		'Em',
		'Fm',
		'F#m',
		'Gm',
		'G#m',
		'Am',
		'Bbm',
		'Bm',
	];
	//C, G, D, A, E, B, Gb, Db, Ab, Eb, Bb

	//major = flat, minor = sharp

	function percentageFromMedian(number, min, max, median) {
		let half = (median - min) / (max - min);
		return (number * half) / (max - min) / 100;
	}

	function weightedAvg(number, alpha, beta) {
		return (1.0 - alpha) * number + alpha * beta;
	}
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
		let radial_data = [];
		let alpha = 0.5;
		let Beta = 1;

		// dance 0 1
		// acous 0 1
		// dur 2/4 min = 120000 240000
		// ener 0 1
		// ins >0.5 => most likely instrumental, 0 1
		// key 0 - 1
		// liven 0 1 0.8 => live
		// loud -60 0
		// mode 0 or 1
		// speech 0.33 -> 0.66 music and speech
		// temp 120 average, 0 240
		// time
		// val 0 1
		if (averages) {
			Object.entries(averages).map(([key, v]) => {
				switch (String(key)) {
					case 'key':
						// console.log(key, v);
						// radial_data.push({ subject: key, value: v / 12 });
						break;
					case 'mode':
						// console.log(key, v);
						// radial_data.push({ subject: key, value: v / 12 });
						break;
					case 'loudness':
						// radial_data.push({ subject: key, value: value / -30 });
						break;
					case 'speechiness':
						// radial_data.push({ subject: key, value: value / -30 });
						break;
					case 'liveness':
						// radial_data.push({ subject: key, value: value / -30 });
						break;
					case 'tempo':
						radial_data.push({
							subject: key,
							value: v / 200,
						});
						break;
					case 'time_signature':
						// radial_data.push({ subject: key, value: value / 120 });
						break;
					case 'duration_ms':
						break;
					case 'acousticness':
						// radial_data.push(v);
						break;
					default:
						radial_data.push({
							subject: key,
							value: v,
						});
						break;
				} //2016 44.6% 2017 35.7% 2018 42.4% 2019 58.2% 2020 48% 2021 47% 2022 50%

				return null;
			});
		}

		refined_content.current = { averages, timeline, graph_data, radial_data };
		hasBeenParsed.current = true;
		console.log('Parsed from Analysis/parse: ', { averages }, { radial_data });
	}

	function dropDownItems() {
		return (
			<div className="playlistDropDownMenu">
				<button onClick={() => setGraphType('danceability:energy')}>
					Energy
				</button>
				<button onClick={() => setGraphType('key:mode')}>Key</button>
				<button onClick={() => setGraphType('loudness:valence')}>Mood</button>
				<button onClick={() => setGraphType('acousticness:liveness')}>
					Liveness
				</button>
				<button onClick={() => setGraphType('instrumentalness:speechiness')}>
					Instrumentalness
				</button>
				<button onClick={() => setGraphType('time_signature:tempo')}>
					Tempo/Meter
				</button>
			</div>
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
	}, [content, parse]);
	return (
		<div id="analysis">
			<h2>{topic.name}</h2>
			<div className="analysisModule">
				<div className="playlistGraph">
					<div className="graphOptions">{dropDownItems()}</div>
					{hasBeenParsed.current && (
						<SpotGraph
							data={refined_content.current.graph_data}
							data_key={graph_type}
						/>
					)}

					{/* Timeline Graph: {JSON.stringify(refined_content.current.timeline)} */}
				</div>
				<div className="radialGraph">
					{/* <button onClick={() => nextFeature()}></button> */}
					{/* Averages Radial: {JSON.stringify(refined_content.current.averages)} */}
					<SpotRadar data={refined_content.current.radial_data} />
				</div>
			</div>
		</div>
	);
};

export default Analysis;
