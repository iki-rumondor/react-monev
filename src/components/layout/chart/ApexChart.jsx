import Chart from "react-apexcharts";

export const ChartModel = ({ categories, series, type }) => {
	const options = {
		chart: {
			id: "basic-bar",
		},
		yaxis: {
			show: false,
		},
		xaxis: {
			categories: categories,
		},
		colors: ['#2F539B', '#33FFB7']
	};

	return <Chart options={options} series={series} type={type} />;
};
