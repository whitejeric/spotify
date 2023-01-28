import React from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const SpotGraph = ({ data, data_key }) => {
	return (
		<ResponsiveContainer minHeight={200} minWidth={50} aspect={16 / 9}>
			<AreaChart
				width={100}
				height={100}
				data={data}
				margin={{
					top: 10,
					right: 0,
					left: 0,
					bottom: 0,
				}}
			>
				{/* <CartesianGrid /> */}
				<XAxis dataKey={{ data_key }} label={data_key} />
				<YAxis hide />

				<Area
					type="monotone"
					dataKey="name"
					stackId="0"
					stroke="black"
					fill="#82ca9d"
				/>

				<Area
					type="monotone"
					dataKey={data_key.split(':')[0]}
					stackId="1"
					stroke="black"
					fill="#82ca9d"
				/>
				<Area
					type="monotone"
					dataKey={data_key.split(':')[1]}
					stackId="1"
					stroke="#82cccc"
					fill="#82cccc"
				/>
				<Tooltip position={{ x: 0, y: 10 }} />
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default SpotGraph;
