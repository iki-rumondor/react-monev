import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Alert, Card, CardBody, Dropdown, Table } from "react-bootstrap";
import Create from "./Create";
import { useParams } from "react-router-dom";
import useLoading from "../../../../hooks/useLoading";
import DashboardLayout from "../../../DashboardLayout";
import { fetchAPI } from "../../../../utils/Fetching";
import {DeleteModal} from "../../../../layout/modals/DeleteModal";

export default function MiddleStudentAttendences() {
	const { setIsLoading, isSuccess } = useLoading();
	const [values, setValues] = useState(null);
	const { yearID } = useParams();
	const [year, setYear] = useState(null);

	const breadcumb = [
		{
			name: "Monev Tengah Semester",
			link: `/middle-monev/years/${yearID}`,
		},
	];

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/middle-monev/student-attendences/years/${yearID}`
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
				header={year?.name}
				breadcumb={breadcumb}
				title={"Persentase Kehadiran Mahasiswa"}
			>
				<Create yearUuid={yearID} />
				<Alert variant="light">
					Persentase Kehadiran = Persentase Kehadiran Mahasiswa Yang Lebih Dari 75%
				</Alert>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Mata Kuliah</th>
									<th>Jumlah Mahasiswa</th>
									<th>Persentase Kehadiran</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.subject.name}</td>
											<td>{item.student_amount}</td>
											<td>{Math.round(item.middle/item.student_amount*100)}%</td>
											<td>
												<DeleteModal
													endpoint={`/api/middle-monev/student-attendences/${item.uuid}`}
												/>
											</td>
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
