import React, { useEffect, useState } from "react";
import "/src/assets/css/landing/bootstrap-icons/bootstrap-icons.css";
import { TopBar } from "./sections/TopBar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Card, CardBody, Table } from "react-bootstrap";
import { fetchAPI } from "../../utils/Fetching";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { Footer } from "./sections/Footer";
import { ChartModel } from "../../layout/chart/ApexChart";
import classNames from "classnames";

const LandingPage = () => {
	const [years, setYears] = useState(null);
	const { setIsLoading } = useLoading();
	const [chart, setChart] = useState(null);
	const [dashboard, setDashboard] = useState(null);

	const handleClick = (value) => {
		setChart(value);
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/academic-years");
			setYears(res.data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoadChart = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/chart/departments/year/${chart}`);
			setDashboard(res.data);
			console.log(res.data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	useEffect(() => {
		if (chart != null) {
			handleLoadChart();
		}
	}, [chart]);

	return (
		<>
			<link
				rel="stylesheet"
				type="text/css"
				href="/src/assets/css/landing/custom.css"
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href="/src/assets/css/landing/bizland.css"
			/>
			<TopBar />
			<Hero />
			<About />
			<div className="bg-white">
				<section id="chart" className=" px-sm-5">
					<div className="section-title">
						<h2>Mata Kuliah Program Studi</h2>
						<p>
							Berikut adalah grafik dari jumlah mata kuliah setiap
							prodi:
						</p>
						<div className="row">
							<div className="col-12 col-lg-10 m-auto">
								<div className="card">
									<div className="card-header">
										<div className="card-header-action">
											<div className="dropdown">
												<a
													href="#"
													className="dropdown-toggle btn btn-primary"
													data-toggle="dropdown"
													aria-expanded="false"
												>
													Pilih Tahun Ajaran
												</a>
												<div
													className="dropdown-menu dropdown-menu-right"
													x-placement="bottom-end"
												>
													{years &&
														years.map(
															(item, idx) => (
																<a
																	key={idx}
																	href="#chart"
																	className={classNames(
																		"dropdown-item",
																		item.uuid ==
																			chart &&
																			"active"
																	)}
																	onClick={() => {
																		handleClick(
																			item.uuid
																		);
																	}}
																>
																	{item.name}
																</a>
															)
														)}
												</div>
											</div>
										</div>
									</div>
									<div className="card-body">
										{chart && (
											<ChartModel
												type={"bar"}
												categories={
													dashboard?.departments
												}
												series={[
													{
														name: "Jumlah Mata Kuliah",
														data: dashboard?.subjects,
													},
													{
														name: "Ketersediaan RPS",
														data: dashboard?.rps,
													},
												]}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};

export default LandingPage;
