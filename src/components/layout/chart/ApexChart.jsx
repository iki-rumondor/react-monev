import Chart from "react-apexcharts";

export const ChartModel = ({ categories, data, type }) => {
	const options = {
		chart: {
			id: "basic-bar",
		},
		yaxis: {
			show: false,
		},
		xaxis: {
			categories: categories,
			position: "top",
		},
	};

	const series = [
		{
			name: "Data",
			data: data,
		},
	];

	return <Chart options={options} series={series} type={type} />;
};
