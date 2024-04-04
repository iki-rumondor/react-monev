import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardBody, Dropdown, Table } from "react-bootstrap";
import Create from "./Create";
import { useParams } from "react-router-dom";
import useLoading from "../../../../hooks/useLoading";
import DashboardLayout from "../../../DashboardLayout";
import { fetchAPI } from "../../../../utils/Fetching";
import { DeleteModal } from "../../../../layout/modals/DeleteModal";

export default function MiddleTeacherAttendences() {
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
				{year?.status == "2" && <Create yearUuid={yearID} />}
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Mata Kuliah</th>
									<th>Kelas</th>
									<th>Penanggung Jawab</th>
									<th>Persentase Kehadiran</th>
									{year?.status == "2" && <th>Aksi</th>}
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.subject.name}</td>
											<td>{item.class}</td>
											<td>{item.teacher.name}</td>
											<td>{item.middle}%</td>
											{year?.status == "2" && (
												<td>
													<DeleteModal
														endpoint={`/api/middle-monev/teacher-attendences/${item.uuid}`}
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
}
