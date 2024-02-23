import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardBody, Dropdown, Table } from "react-bootstrap";
import Update from "./Update";
import { useParams } from "react-router-dom";
import useLoading from "../../../../hooks/useLoading";
import DashboardLayout from "../../../DashboardLayout";
import { fetchAPI } from "../../../../utils/Fetching";

export default function MiddleLastTeacherAttendences() {
	const { setIsLoading, isSuccess } = useLoading();
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
				`/api/middle-monev/teacher-attendences/years/${yearID}`
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
				title={"Persentase Kehadiran Dosen Dalam Mengajar"}
			>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Mata Kuliah</th>
									<th>
										Persentase Tengah Semester
									</th>
									<th>Persentase Sekarang</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.subject.name}</td>
											<td>{item.middle}%</td>
											<td>{item.last}%</td>
											<td>
												<Update uuid={item.uuid} />
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
