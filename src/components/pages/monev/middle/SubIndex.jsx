import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import useLoading from "../../../hooks/useLoading";
import { Button, Card, CardBody, Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../../utils/Fetching";

export const SubMiddleMonev = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const { yearID } = useParams();
	const [year, setYear] = useState(null);
	const [values, setValues] = useState(null);
	const links = [
		`/middle-monev/teacher-attendences/years/${yearID}`,
		`/middle-monev/student-attendences/years/${yearID}`,
		`/middle-monev/plans/years/${yearID}`,
	];

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/middle-monev/years/" + yearID);
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
				header={`Monev Tengah Semester: Tahun Ajaran ${year?.name}`}
			>
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Instrumen Monev</th>
									<th>Jumlah Data</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.name}</td>
											<td>{item.amount}</td>
											<td>
												<Button href={links[idx]}>Lihat</Button>
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
};
