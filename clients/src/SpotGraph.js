import React, { PureComponent } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const SpotGraph = ({ data }) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				width={500}
				height={10}
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}
			>
				<CartesianGrid strokeDasharray="2" />
				<XAxis hide />
				<YAxis />
				<Tooltip cursor filterNull="false" />
				<Area
					type="monotone"
					dataKey="name"
					stackId="0"
					stroke="#82ca9d"
					fill="#82ca9d"
				/>
				<Area
					type="monotone"
					dataKey="danceability"
					stackId="1"
					stroke="#8884d8"
					fill="#8884d8"
				/>
				<Area
					type="monotone"
					dataKey="energy"
					stackId="1"
					stroke="#82ca9d"
					fill="#82ca9d"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default SpotGraph;
