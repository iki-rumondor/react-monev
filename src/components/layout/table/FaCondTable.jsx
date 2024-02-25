import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";

export const FaCondTable = ({ departmentID, yearID }) => {
	const { setIsLoading } = useLoading();
	const [values, setValues] = useState(null);
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/facility-conditions/departments/${departmentID}/years/${yearID}`
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
						<th>Fasilitas</th>
						<th>Jumlah</th>
						<th>Tidak Berfungsi</th>
						<th>Catatan</th>
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
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};
