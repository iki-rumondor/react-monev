import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Card, CardBody, Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { sprintf } from "sprintf-js";
import { fetchAPI } from "../../utils/Fetching";
import Create from "./Create";
import Edit from "./Edit";
import Delete from "./Delete";

export const SubFacilityCondition = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const [values, setValues] = useState(null);
	const [year, setYear] = useState(null);
	const { yearID } = useParams();
	const breadcumb = [
		{
			name: "Monev Awal Semester",
			link: `/first-monev/years/${yearID}`,
		},
	];

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				"/api/facility-conditions/years/" + yearID
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

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout
				header={sprintf("Tahun Ajaran : %s", year?.name)}
				breadcumb={breadcumb}
				title={"Fasilitas, Sarana, dan Prasarana"}
			>
				{year?.open && <Create academic_year={yearID} />}
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Fasilitas</th>
									<th>Jumlah</th>
									<th>Tidak Berfungsi</th>
									<th>Catatan</th>
									{year?.open && <th>Aksi</th>}
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.facility.name}</td>
											<td>{`${item.amount} ${item.unit}`}</td>
											<td>
												<span className="badge badge-warning">{`${item.deactive} ${item.unit}`}</span>
											</td>
											<td>{item.note}</td>
											{year?.open && (
												<td>
													<Dropdown>
														<Dropdown.Toggle
															className="btn-sm"
															variant="danger"
															id="dropdown-basic"
														>
															Pilih
														</Dropdown.Toggle>

														<Dropdown.Menu>
															<Edit
																uuid={item.uuid}
															/>
															<Delete
																uuid={item.uuid}
															/>
														</Dropdown.Menu>
													</Dropdown>
												</td>
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
