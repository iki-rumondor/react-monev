import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Alert, Card, CardBody, Dropdown, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useLoading from "../../../../hooks/useLoading";
import DashboardLayout from "../../../DashboardLayout";
import { fetchAPI } from "../../../../utils/Fetching";
import Update from "./Update";

export default function StudentPassed() {
	const { setIsLoading, isSuccess } = useLoading();
	const [values, setValues] = useState(null);
	const { yearID } = useParams();
	const [year, setYear] = useState(null);

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
				header={`Persentase Kelulusan Mahasiswa Per Mata Kuliah: ${year?.name}`}
			>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Mata Kuliah</th>
									<th>Jumlah Mahasiswa</th>
									<th>Persentase Kelulusan</th>
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
											<td>{Math.round(item.passed_amount/item.student_amount*100)}%</td>
											<td>
												<Update uuid={item.uuid} student_amount={item.student_amount}/>
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
