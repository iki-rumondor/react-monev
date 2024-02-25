import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";

export const PlanMiddle = ({ departmentID, yearID }) => {
	const { setIsLoading } = useLoading();
	const [values, setValues] = useState(null);
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/academic-plans/departments/${departmentID}/years/${yearID}`
			);
			setValues(res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	return (
		<>
			<Table className="table-bordered">
				<thead>
					<tr>
						<th>No</th>
						<th>Mata Kuliah</th>
						<th>Status Tengah Semester</th>
						<th>Status Akhir Semester</th>
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
									<td>
										<span className="badge badge-success">
											Sesuai
										</span>
									</td>
								) : (
									<td>
										<span className="badge badge-warning">
											Tidak Sesuai
										</span>
									</td>
								)}
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};
