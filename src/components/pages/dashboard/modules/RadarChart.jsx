import Chart from "react-apexcharts";

const ChartModel = () => {
	const options = {
		chart: {
			id: "radar",
			width: "100%",
		},
		yaxis: {
			show: false,
		},
		xaxis: {
			categories: ["April", "May", "June", "July", "August", "September"],
			labels: {
				show: true,
				style: {
					width: "100%",
					colors: ["#a8a8a8"],
					fontSize: "11px",
					fontFamily: "Arial",
				},
			},
		},
	};

	const series = [
		{
			name: "Radar Series 1",
			data: [45, 52, 38, 24, 33, 10],
		},
	];

	return <Chart options={options} series={series} type="radar" />;
};

export const RadarChart = () => {
	return (
		<div className="col-12 col-xl-6">
			<div className="card">
				<div className="card-header">
					<h4>Grafik Radar</h4>
					<div className="card-header-action">
						<a href="#" className="btn active">
							Week
						</a>
						<a href="#" className="btn">
							Month
						</a>
						<a href="#" className="btn">
							Year
						</a>
					</div>
				</div>
				<div className="card-body">
					<ChartModel />
				</div>
			</div>
		</div>
	);
};
