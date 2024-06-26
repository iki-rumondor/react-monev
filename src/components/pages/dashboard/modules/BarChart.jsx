import Chart from "react-apexcharts";

const ChartModel = ({ tipe }) => {
	const options = {
		chart: {
			id: "basic-bar",
		},
		yaxis: {
			show: false,
		},
		xaxis: {
			categories: ["RPS", "Modul", "Alat Praktikum", "Kemampuan Dosen"],
			position: "top",
		},
	};

	const series = [
		{
			data: [30, 40, 45, 10],
		},
	];

	return <Chart options={options} series={series} type={tipe} />;
};

export const BarChart = ({ tipe }) => {
	return (
		<div className="col-12 col-xl-6">
			<div className="card">
				<div className="card-header">
					<h4>Jumlah Ketersediaan</h4>
					<div className="card-header-action">
						<div className="dropdown">
							<a
								href="#"
								className="dropdown-toggle btn btn-primary"
								data-toggle="dropdown"
								aria-expanded="false"
							>
								Teknik Informatika
							</a>
							<div
								className="dropdown-menu dropdown-menu-right"
								x-placement="bottom-end"
							>
								<a href="#" className="dropdown-item active">
									RPS
								</a>
								<a href="#" className="dropdown-item">
									Alat Praktikum
								</a>
								<a href="#" className="dropdown-item">
									Modul Praktikum
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="card-body">
					<ChartModel tipe={tipe} />
				</div>
			</div>
		</div>
	);
};
