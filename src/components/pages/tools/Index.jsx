import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Card, CardBody, CardHeader, Row, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/Fetching";
import { DeleteModal } from "../../layout/modals/DeleteModal";
import Create from "./Create";

export const Tools = () => {
	const { isSuccess } = useLoading();
	const [values, setValues] = useState(null);
	const [year, setYear] = useState(null);
	const { yearID } = useParams();
	const breadcumb = [
		{
			name: "Monev Awal Semester",
			link: `/first-monev/years/${yearID}`,
		},
	];

	const loadHandler = async () => {
		try {
			const res = await fetchAPI("/api/practical-tools/years/" + yearID);
			const year = await fetchAPI("/api/academic-years/" + yearID);
			setValues(res.data);
			setYear(year.data);
		} catch (error) {
			console.log(error);
			// toast.error(error);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout
				header={year?.name}
				breadcumb={breadcumb}
				title={"Ketersediaan Alat praktikum"}
			>
				{year?.open && <Create academic_year_uuid={yearID} />}
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Mata Kuliah Praktikum</th>
									<th>Status</th>
									<th>Kondisi</th>
									<th>Catatan</th>
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
												{item.available ? (
													<span className="badge badge-success">
														Tersedia
													</span>
												) : (
													<span className="badge badge-warning">
														Tidak Tersedia
													</span>
												)}
											</td>
											<td>{item.condition}</td>
											<td>{item.note}</td>
											{year?.open && (
												<td>
													<DeleteModal
														endpoint={`/api/practical-tools/${item.uuid}`}
													/>
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
