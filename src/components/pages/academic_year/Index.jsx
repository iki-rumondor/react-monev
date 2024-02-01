import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import Create from "./Create";
import Delete from "./Delete";
import Edit from "./Edit";

export default function AcademicYear() {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);

	const loadHandler = async () => {
		try {
			const res = await fetchData("academic-years");
			setValues(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isLoading]);

	return (
		<>
			<DashboardLayout header={"Tahun Ajaran"}>
				<Create />
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Nama</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.name}</td>
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
								</tr>
							))}
					</tbody>
				</Table>
			</DashboardLayout>
		</>
	);
}
