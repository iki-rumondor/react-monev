import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Card, CardBody, CardHeader, Row, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { Actions } from "./modules/Actions";
import { RPSCard } from "./modules/Card";
import { useParams } from "react-router-dom";
import { sprintf } from "sprintf-js";

export const SubRPS = () => {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);
	const [year, setYear] = useState(null);
	const { yearID } = useParams();

	const loadHandler = async () => {
		try {
			const res = await fetchData("subjects");
			const year = await fetchData("academic-years/" + yearID);
			setValues(res.data);
			setYear(year.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isLoading]);

	return (
		<>
			<DashboardLayout
				header={sprintf("RPS Tahun Ajaran : %s", year?.name)}
			>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Kode</th>
									<th>Mata Kuliah</th>
									<th>Status</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.code}</td>
											<td>{item.name}</td>
											{item?.academic_plan?.academic_year
												?.uuid == yearID ? (
												<>
													<td>
														<span className="badge badge-success">
															Dilengkapi
														</span>
													</td>
													<td>
														<Actions
															item={item}
															status={true}
															academic_year_uuid={year?.uuid}
														/>
													</td>
												</>
											) : (
												<>
													<td>
														<span className="badge badge-warning">
															Belum Dilengkapi
														</span>
													</td>
													<td>
														<Actions
															item={item}
															status={false}
															academic_year_uuid={year?.uuid}
														/>
													</td>
												</>
											)}
										</tr>
									))}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</DashboardLayout>
		</>
	);
};
