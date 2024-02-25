import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Card, CardBody, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useLoading from "../../../../hooks/useLoading";
import DashboardLayout from "../../../DashboardLayout";
import { fetchAPI, postAPI } from "../../../../utils/Fetching";

export default function MiddleLastPlans() {
	const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
	const [values, setValues] = useState(null);
	const { yearID } = useParams();
	const [year, setYear] = useState(null);
	const breadcumb = [
		{
			name: "Monev Sebelum UAS",
			link: `/middle-last-monev/years/${yearID}`,
		},
	];

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/academic-plans/middle/years/${yearID}`
			);
			setValues(res.data);
			const y_res = await fetchAPI("/api/academic-years/" + yearID);
			setYear(y_res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (value, uuid) => {
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI(
				`/api/academic-plans/${uuid}/last`,
				"PATCH",
				{ last: value }
			);
			toast.success(res.message);
			setIsSuccess(true);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout
				header={year?.name}
				breadcumb={breadcumb}
				title={"Kesesuaian Mengajar Dosen dengan RPS"}
			>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Mata Kuliah</th>
									<th>Status Tengah Semester</th>
									<th>Status Akhir Semester</th>
									{year?.open && <th>Aksi</th>}
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.subject.name}</td>
											<td>
												{item.middle ? (
													<span className="badge badge-success">
														Sesuai
													</span>
												) : (
													<span className="badge badge-warning">
														Tidak Sesuai
													</span>
												)}
											</td>
											{item.last ? (
												<>
													<td>
														<span className="badge badge-success">
															Sesuai
														</span>
													</td>
													{year?.open && (
														<td>
															<Button
																value={false}
																variant="danger"
																className="btn-sm btn-icon"
																onClick={() => {
																	handleSubmit(
																		false,
																		item.uuid
																	);
																}}
															>
																<i className="fas fa-times"></i>
															</Button>
														</td>
													)}
												</>
											) : (
												<>
													<td>
														<span className="badge badge-warning">
															Tidak Sesuai
														</span>
													</td>
													{year?.open && (
														<td>
															<Button
																variant="success"
																className="btn-sm btn-icon"
																onClick={() => {
																	handleSubmit(
																		true,
																		item.uuid
																	);
																}}
															>
																<i className="fas fa-check"></i>
															</Button>
														</td>
													)}
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
}
